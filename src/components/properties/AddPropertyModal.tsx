'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building, MapPin, Hash, Check, DollarSign, FileText, UserSquare2, ChevronRight } from 'lucide-react';
import { createProperty } from '@/services/propertyService';
import { fetchLandlords, LandlordRecord } from '@/services/landlordService';
import { PropertyCreatePayload, PropertyType, ListingType, TitleType, LandlordCreatePayload } from '@/types/property';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultListingType?: ListingType;
}

export function AddPropertyModal({ isOpen, onClose, onSuccess, defaultListingType = 'rent' }: AddPropertyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<PropertyCreatePayload>>({
    property_address: '',
    property_type: 'Flat',
    listing_type: defaultListingType,
    bedrooms: null,
    bathrooms: null,
    list_price: null,
    title_type: 'C_OF_O',
    notes: '',
    subdivision_code: 'NG-LA',
    parcel_number: ''
  });

  const [landlords, setLandlords] = useState<LandlordRecord[]>([]);
  const [createNewLandlord, setCreateNewLandlord] = useState(false);
  const [documentUrls, setDocumentUrls] = useState('');
  const [landlordData, setLandlordData] = useState<Partial<LandlordCreatePayload>>({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    ownership_type: 'MANAGED_BY_FIRM'
  });

  useEffect(() => {
    if (isOpen) {
      fetchLandlords().then(setLandlords).catch(console.error);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? Number(value) : null) : value
    }));
  };

  const handleLandlordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLandlordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.property_address || !formData.property_type || !formData.subdivision_code || !formData.parcel_number) {
        throw new Error('Address, Property Type, State, and Parcel Number are required');
      }

      const payload = { ...formData } as PropertyCreatePayload;
      if (documentUrls.trim()) {
        payload.documents = documentUrls.split(',').map(u => u.trim()).filter(Boolean);
      }

      if (createNewLandlord) {
        payload.landlord = landlordData as LandlordCreatePayload;
        payload.landlord_id = null;
      }

      await createProperty(payload);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-50 flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-whisper-border">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Building className="h-5 w-5 text-emerald-trust" />
                Add New Property
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sidebar-scroll bg-slate-50/50">
              <form id="add-property-form" onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 bg-red-50/80 border border-red-200 text-red-600 rounded-xl text-sm font-medium flex items-start gap-3">
                    <X className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                {/* --- Property Details Section --- */}
                <section className="space-y-6 bg-white p-6 rounded-xl border border-whisper-border shadow-sm">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
                    <Building className="h-5 w-5 text-slate-400" />
                    <h3 className="text-lg font-medium text-slate-900">Property Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Property Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-trust transition-colors" />
                        </div>
                        <input
                          type="text"
                          name="property_address"
                          required
                          value={formData.property_address || ''}
                          onChange={handleChange}
                          placeholder="e.g. 123 Victoria Island, Lagos"
                          className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subdivision_code"
                        required
                        value={formData.subdivision_code || 'NG-LA'}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200 appearance-none"
                      >
                        <option value="NG-LA">Lagos</option>
                        <option value="NG-FC">Abuja (FCT)</option>
                        <option value="NG-AB">Abia</option>
                        <option value="NG-AD">Adamawa</option>
                        <option value="NG-AK">Akwa Ibom</option>
                        <option value="NG-AN">Anambra</option>
                        <option value="NG-BA">Bauchi</option>
                        <option value="NG-BY">Bayelsa</option>
                        <option value="NG-BE">Benue</option>
                        <option value="NG-BO">Borno</option>
                        <option value="NG-CR">Cross River</option>
                        <option value="NG-DE">Delta</option>
                        <option value="NG-EB">Ebonyi</option>
                        <option value="NG-ED">Edo</option>
                        <option value="NG-EK">Ekiti</option>
                        <option value="NG-EN">Enugu</option>
                        <option value="NG-GO">Gombe</option>
                        <option value="NG-IM">Imo</option>
                        <option value="NG-JI">Jigawa</option>
                        <option value="NG-KD">Kaduna</option>
                        <option value="NG-KN">Kano</option>
                        <option value="NG-KT">Katsina</option>
                        <option value="NG-KE">Kebbi</option>
                        <option value="NG-KO">Kogi</option>
                        <option value="NG-KW">Kwara</option>
                        <option value="NG-NA">Nasarawa</option>
                        <option value="NG-NI">Niger</option>
                        <option value="NG-OG">Ogun</option>
                        <option value="NG-ON">Ondo</option>
                        <option value="NG-OS">Osun</option>
                        <option value="NG-OY">Oyo</option>
                        <option value="NG-PL">Plateau</option>
                        <option value="NG-RI">Rivers</option>
                        <option value="NG-SO">Sokoto</option>
                        <option value="NG-TA">Taraba</option>
                        <option value="NG-YO">Yobe</option>
                        <option value="NG-ZA">Zamfara</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Parcel/Plot Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="parcel_number"
                        required
                        value={formData.parcel_number || ''}
                        onChange={handleChange}
                        placeholder="e.g. Block 4, Plot 12"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Listing Type</label>
                      <select
                        name="listing_type"
                        value={formData.listing_type || 'rent'}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                      >
                        <option value="rent">Rent</option>
                        <option value="sale">Sale</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Type</label>
                      <select
                        name="property_type"
                        value={formData.property_type || 'Flat'}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                      >
                        <option value="Land">Land</option>
                        <option value="Building">Building</option>
                        <option value="Semi-Detached Duplex">Semi-Detached Duplex</option>
                        <option value="Detached Duplex">Detached Duplex</option>
                        <option value="Terrace">Terrace</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="Flat">Flat</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Mixed Use">Mixed Use</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">List Price</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <span className="text-slate-400 group-focus-within:text-emerald-trust font-medium">₦</span>
                        </div>
                        <input
                          type="number"
                          name="list_price"
                          value={formData.list_price || ''}
                          onChange={handleChange}
                          placeholder="e.g. 5,000,000"
                          className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Title Document</label>
                      <select
                        name="title_type"
                        value={formData.title_type || 'C_OF_O'}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                      >
                        <option value="C_OF_O">C of O</option>
                        <option value="GOVERNORS_CONSENT">Governor&apos;s Consent</option>
                        <option value="DEED_OF_ASSIGNMENT">Deed of Assignment</option>
                        <option value="EXCISION">Excision</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms || ''}
                        onChange={handleChange}
                        placeholder="e.g. 3"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Bathrooms</label>
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms || ''}
                        onChange={handleChange}
                        placeholder="e.g. 3"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Description & Notes</label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes || ''}
                        onChange={handleChange}
                        placeholder="Additional details about the property..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                </section>

                {/* --- Financials Section --- */}
                <section className="space-y-6 bg-white p-6 rounded-xl border border-whisper-border shadow-sm">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                    <h3 className="text-lg font-medium text-slate-900">Financial Settings</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Management Fee (%)</label>
                      <div className="relative group">
                        <input
                          type="number"
                          name="management_fee_pct"
                          value={formData.management_fee_pct ?? 5}
                          onChange={handleChange}
                          placeholder="e.g. 5"
                          className="w-full pl-4 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                          <span className="text-slate-400 group-focus-within:text-emerald-trust">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Remittance Frequency</label>
                      <select
                        name="remittance_frequency"
                        value={formData.remittance_frequency || 'MONTHLY'}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                      >
                        <option value="MONTHLY">Monthly</option>
                        <option value="QUARTERLY">Quarterly</option>
                        <option value="ANNUALLY">Annually</option>
                        <option value="ON_COLLECTION">On Collection</option>
                      </select>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Caution Fee / Security Deposit</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <span className="text-slate-400 group-focus-within:text-emerald-trust font-medium">₦</span>
                        </div>
                        <input
                          type="number"
                          name="caution_fee"
                          value={formData.caution_fee || ''}
                          onChange={handleChange}
                          placeholder="e.g. 500,000"
                          className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* --- Documents Section --- */}
                <section className="space-y-6 bg-white p-6 rounded-xl border border-whisper-border shadow-sm">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
                    <FileText className="h-5 w-5 text-slate-400" />
                    <h3 className="text-lg font-medium text-slate-900">Documents</h3>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Document URLs</label>
                    <textarea
                      rows={2}
                      value={documentUrls}
                      onChange={e => setDocumentUrls(e.target.value)}
                      placeholder="e.g. https://drive.google.com/..., https://dropbox.com/..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200 resize-none"
                    />
                    <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3" />
                      Separate multiple URLs with a comma
                    </p>
                  </div>
                </section>

                {/* --- Landlord Section --- */}
                <section className="space-y-6 bg-white p-6 rounded-xl border border-whisper-border shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <UserSquare2 className="h-5 w-5 text-slate-400" />
                      <h3 className="text-lg font-medium text-slate-900">Landlord Details</h3>
                    </div>
                    
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={createNewLandlord} 
                          onChange={e => setCreateNewLandlord(e.target.checked)}
                          className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 checked:bg-emerald-trust checked:border-emerald-trust transition-all cursor-pointer"
                        />
                        <Check className="h-3.5 w-3.5 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Create New Landlord</span>
                    </label>
                  </div>

                  <AnimatePresence mode="wait">
                    {!createNewLandlord ? (
                      <motion.div
                        key="select-landlord"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Existing Landlord</label>
                        <select
                          name="landlord_id"
                          value={formData.landlord_id || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                        >
                          <option value="">-- Select Landlord --</option>
                          {landlords.map(l => (
                            <option key={l.landlord_id} value={l.landlord_id}>
                              {l.first_name} {l.last_name} ({l.email})
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="create-landlord"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50/50 rounded-xl border border-slate-200/60"
                      >
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="first_name"
                            required={createNewLandlord}
                            value={landlordData.first_name || ''}
                            onChange={handleLandlordChange}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="last_name"
                            required={createNewLandlord}
                            value={landlordData.last_name || ''}
                            onChange={handleLandlordChange}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                          <input
                            type="email"
                            name="email"
                            required={createNewLandlord}
                            value={landlordData.email || ''}
                            onChange={handleLandlordChange}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="phone"
                            required={createNewLandlord}
                            value={landlordData.phone || ''}
                            onChange={handleLandlordChange}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Ownership Type</label>
                          <select
                            name="ownership_type"
                            value={landlordData.ownership_type || 'MANAGED_BY_FIRM'}
                            onChange={handleLandlordChange}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 focus:border-emerald-trust transition-all duration-200"
                          >
                            <option value="MANAGED_BY_FIRM">Managed by Firm</option>
                            <option value="THIRD_PARTY_INVESTOR">Third Party Investor</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center pl-6 bg-slate-50/80 backdrop-blur-sm rounded-b-xl">
              <div className="flex-1 text-xs text-slate-500">
                Please fill all required fields before saving.
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="add-property-form"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-emerald-trust rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-trust/30 focus:ring-offset-1"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Save Property
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
