'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building, MapPin, Hash, Check } from 'lucide-react';
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
    } catch (err: any) {
      setError(err.message || 'Failed to create property');
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

            <div className="flex-1 overflow-y-auto p-6 sidebar-scroll">
              <form id="add-property-form" onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Property Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        name="property_address"
                        required
                        value={formData.property_address || ''}
                        onChange={handleChange}
                        placeholder="e.g. 123 Victoria Island, Lagos"
                        className="w-full pl-10 pr-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subdivision_code"
                        required
                        value={formData.subdivision_code || 'NG-LA'}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
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

                    {/* Parcel Number */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Parcel/Plot Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="parcel_number"
                        required
                        value={formData.parcel_number || ''}
                        onChange={handleChange}
                        placeholder="e.g. Block 4, Plot 12"
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Listing Type */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Listing Type</label>
                      <select
                        name="listing_type"
                        value={formData.listing_type || 'rent'}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                      >
                        <option value="rent">Rent</option>
                        <option value="sale">Sale</option>
                      </select>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
                      <select
                        name="property_type"
                        value={formData.property_type || 'Flat'}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
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

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">List Price (₦)</label>
                      <input
                        type="number"
                        name="list_price"
                        value={formData.list_price || ''}
                        onChange={handleChange}
                        placeholder="e.g. 5000000"
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                      />
                    </div>

                    {/* Title Type */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                      <select
                        name="title_type"
                        value={formData.title_type || 'C_OF_O'}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                      >
                        <option value="C_OF_O">C of O</option>
                        <option value="GOVERNORS_CONSENT">Governor's Consent</option>
                        <option value="DEED_OF_ASSIGNMENT">Deed of Assignment</option>
                        <option value="EXCISION">Excision</option>
                      </select>
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Bedrooms</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms || ''}
                          onChange={handleChange}
                          placeholder="e.g. 3"
                          className="w-full pl-9 pr-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Bathrooms */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Bathrooms</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="number"
                          name="bathrooms"
                          value={formData.bathrooms || ''}
                          onChange={handleChange}
                          placeholder="e.g. 3"
                          className="w-full pl-9 pr-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes || ''}
                      onChange={handleChange}
                      placeholder="Additional details about the property..."
                      className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <hr className="border-whisper-border" />
                  <h3 className="text-lg font-medium text-slate-900">Financials</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Management Fee (%)</label>
                      <input
                        type="number"
                        name="management_fee_pct"
                        value={formData.management_fee_pct ?? 5}
                        onChange={handleChange}
                        placeholder="e.g. 5"
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Remittance Frequency</label>
                      <select
                        name="remittance_frequency"
                        value={formData.remittance_frequency || 'MONTHLY'}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                      >
                        <option value="MONTHLY">Monthly</option>
                        <option value="QUARTERLY">Quarterly</option>
                        <option value="ANNUALLY">Annually</option>
                        <option value="ON_COLLECTION">On Collection</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Caution Fee (₦)</label>
                      <input
                        type="number"
                        name="caution_fee"
                        value={formData.caution_fee || ''}
                        onChange={handleChange}
                        placeholder="e.g. 500000"
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                      />
                    </div>
                  </div>

                  <hr className="border-whisper-border" />
                  <h3 className="text-lg font-medium text-slate-900">Documents</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Document URLs (Comma separated)</label>
                    <input
                      type="text"
                      value={documentUrls}
                      onChange={e => setDocumentUrls(e.target.value)}
                      placeholder="https://example.com/doc1.pdf, https://example.com/doc2.pdf"
                      className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                    />
                  </div>

                  <hr className="border-whisper-border" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-slate-900">Landlord Details</h3>
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input 
                        type="checkbox" 
                        checked={createNewLandlord} 
                        onChange={e => setCreateNewLandlord(e.target.checked)}
                        className="rounded border-slate-300 text-emerald-trust focus:ring-emerald-trust"
                      />
                      Create New Landlord
                    </label>
                  </div>

                  {!createNewLandlord ? (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Select Existing Landlord</label>
                      <select
                        name="landlord_id"
                        value={formData.landlord_id || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-whisper-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust focus:border-transparent"
                      >
                        <option value="">-- Select Landlord --</option>
                        {landlords.map(l => (
                          <option key={l.landlord_id} value={l.landlord_id}>
                            {l.first_name} {l.last_name} ({l.email})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 p-4 border border-whisper-border rounded-lg bg-slate-50">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="first_name"
                          required={createNewLandlord}
                          value={landlordData.first_name || ''}
                          onChange={handleLandlordChange}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="last_name"
                          required={createNewLandlord}
                          value={landlordData.last_name || ''}
                          onChange={handleLandlordChange}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          name="email"
                          required={createNewLandlord}
                          value={landlordData.email || ''}
                          onChange={handleLandlordChange}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="phone"
                          required={createNewLandlord}
                          value={landlordData.phone || ''}
                          onChange={handleLandlordChange}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Ownership Type</label>
                        <select
                          name="ownership_type"
                          value={landlordData.ownership_type || 'MANAGED_BY_FIRM'}
                          onChange={handleLandlordChange}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-trust"
                        >
                          <option value="MANAGED_BY_FIRM">Managed by Firm</option>
                          <option value="THIRD_PARTY_INVESTOR">Third Party Investor</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-whisper-border flex justify-end gap-3 bg-slate-50 rounded-b-xl">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="add-property-form"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-trust rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Save Property
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
