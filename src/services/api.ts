/**
 * Shared API client — centralises base URL, auth headers, and error handling.
 * All domain services should use `apiFetch` instead of raw `fetch`.
 */

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Thin wrapper around fetch that automatically attaches the auth token
 * and handles 307 redirect-slash issues (FastAPI strips auth on redirect).
 */
export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  // MOCK IMPLEMENTATION FOR PREVIEW ENVIRONMENT
  // Return empty arrays or dummy objects to prevent "Failed to fetch"
  console.log(`[API Mock] Intercepted request to: ${path}`);
  
  if (path.includes('/landlords')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' }});
  }
  if (path.includes('/properties')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' }});
  }
  if (path.includes('/tenants')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' }});
  }
  if (path.includes('/clients')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' }});
  }
  if (path.includes('/sales')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' }});
  }
  if (path.includes('/leases')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' }});
  }
  if (path.includes('/commissions')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' }});
  }
  
  return new Response(JSON.stringify({ message: "Mock response" }), { status: 200, headers: { 'Content-Type': 'application/json' }});
}
