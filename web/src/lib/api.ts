
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://haatsetu-api.onrender.com/api/v1";

export interface PendingArtisan {
  id: string;
  user_id: string;
  name: string;
  phone?: string;
  state: string;
  district?: string;
  craft?: string;
  submitted_date: string;
  verification_status: string;
  is_verified: boolean;
  verification_document_url?: string;
  pehchan_id?: string;
  credentials_available: boolean;
}

export interface ArtisanDetail {
  id: string;
  user_id: string;
  name: string;
  phone?: string;
  email?: string;
  state: string;
  district?: string;
  cluster?: string;
  craft?: string;
  scheme?: string;
  beneficiary_id?: string;
  intake_monthly_income?: number;
  submitted_date: string;
  is_verified: boolean;
  verification_status: string;
  verification_document_url?: string;
  pehchan_id?: string;
  pehchan_status: string;
  workspace_verification_status: string;
  product_count: number;
}

/** Returns null when the API cannot be reached, so the queue can say so instead of looking empty. */
export async function fetchPendingVerifications(): Promise<PendingArtisan[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/ministry/verification/pending`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API fetch error", err);
  }
  return null;
}

/**
 * Returns null when the record cannot be loaded. The workspace shows an error
 * instead of a stand-in profile: an officer must never review invented data.
 */
export async function fetchArtisanDetail(id: string): Promise<ArtisanDetail | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/ministry/verification/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API fetch error", err);
  }
  return null;
}

export async function approveArtisan(id: string): Promise<boolean> {
  // Reports what actually happened. An approval that failed and claimed
  // success leaves an artisan unverified while the officer believes they are
  // cleared, and nothing downstream ever catches it.
  try {
    const res = await fetch(`${API_BASE_URL}/ministry/verification/${encodeURIComponent(id)}/approve`, {
      method: "POST",
    });
    return res.ok;
  } catch (err) {
    console.warn("API approve error", err);
    return false;
  }
}

export async function requestMoreInfo(id: string, reason: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/ministry/verification/${encodeURIComponent(id)}/action-required`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    return res.ok;
  } catch (err) {
    console.warn("API requestMoreInfo error", err);
    return false;
  }
}
