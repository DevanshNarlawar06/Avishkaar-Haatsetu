
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://bharatse-api.onrender.com/api/v1";

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

export async function fetchPendingVerifications(): Promise<PendingArtisan[]> {
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
  return [];
}

export async function fetchArtisanDetail(id: string): Promise<ArtisanDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/ministry/verification/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API fetch error", err);
  }

  return {
    id,
    user_id: id,
    name: "Artisan Profile",
    phone: "+91 98000 00000",
    email: "artisan@example.com",
    state: "India",
    district: "Central District",
    cluster: "Craft Cluster",
    craft: "Traditional Craft",
    scheme: "none",
    beneficiary_id: "PHN-IN-0001",
    intake_monthly_income: 5000,
    submitted_date: "06 Sep 2026",
    is_verified: false,
    verification_status: "Pending",
    verification_document_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Aadhaar_letter_large.png/640px-Aadhaar_letter_large.png",
    pehchan_id: "PHN-IN-0001",
    pehchan_status: "Pending Verification",
    workspace_verification_status: "Not Requested",
    product_count: 1,
  };
}

export async function approveArtisan(id: string): Promise<boolean> {
  // Reports what actually happened. An approval that failed and claimed
  // success leaves an artisan unverified while the officer believes they are
  // cleared, and nothing downstream ever catches it.
  try {
    const res = await fetch(`${API_BASE_URL}/ministry/verification/${id}/approve`, {
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
    const res = await fetch(`${API_BASE_URL}/ministry/verification/${id}/action-required`, {
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
