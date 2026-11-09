/**
 * Demo data for the ministry dashboard.
 *
 * Stands in for the API. Every number here is fabricated for the prototype and
 * is labelled as such in the interface, because a dashboard that quietly
 * presents invented figures as real is worse than one that shows nothing.
 */

export type Trend = "up" | "down" | "flat";

export interface Kpi {
  id: string;
  label: string;
  value: string;
  unit?: string;
  change: number;
  trend: Trend;
  note: string;
}

export const kpis: Kpi[] = [
  {
    id: "artisans",
    label: "Registered artisans",
    value: "12,847",
    change: 8.4,
    trend: "up",
    note: "Onboarded across 12 states",
  },
  {
    id: "active",
    label: "Active this month",
    value: "8,392",
    change: 5.1,
    trend: "up",
    note: "Listed or fulfilled at least once",
  },
  {
    id: "income",
    label: "Median monthly income",
    value: "₹9,240",
    change: 34.6,
    trend: "up",
    note: "Against ₹6,870 at intake",
  },
  {
    id: "gmv",
    label: "Value of goods sold",
    value: "₹4.62 Cr",
    change: 12.9,
    trend: "up",
    note: "Cumulative this financial year",
  },
];

/** Median monthly artisan income, at intake and now. */
export const incomeSeries = [
  { month: "Apr", intake: 6870, current: 7010 },
  { month: "May", intake: 6870, current: 7240 },
  { month: "Jun", intake: 6870, current: 7620 },
  { month: "Jul", intake: 6870, current: 8010 },
  { month: "Aug", intake: 6870, current: 8290 },
  { month: "Sep", intake: 6870, current: 8480 },
  { month: "Oct", intake: 6870, current: 8905 },
  { month: "Nov", intake: 6870, current: 9240 },
];

/** Listings created against orders fulfilled, to show the funnel is healthy. */
export const activitySeries = [
  { month: "Apr", listings: 1840, orders: 610 },
  { month: "May", listings: 2120, orders: 742 },
  { month: "Jun", listings: 2460, orders: 918 },
  { month: "Jul", listings: 2810, orders: 1104 },
  { month: "Aug", listings: 3040, orders: 1287 },
  { month: "Sep", listings: 3390, orders: 1462 },
  { month: "Oct", listings: 3720, orders: 1691 },
  { month: "Nov", listings: 4085, orders: 1908 },
];

export interface Scheme {
  id: string;
  name: string;
  beneficiaries: number;
  target: number;
}

export const schemes: Scheme[] = [
  { id: "sc", name: "Scheduled Caste welfare", beneficiaries: 4820, target: 6000 },
  { id: "obc", name: "Backward Classes welfare", beneficiaries: 3410, target: 4500 },
  { id: "dnt", name: "De notified and nomadic tribes", beneficiaries: 2190, target: 2500 },
  { id: "pwd", name: "Persons with disabilities", beneficiaries: 1487, target: 2000 },
  { id: "sr", name: "Senior citizen artisans", beneficiaries: 940, target: 1200 },
];

export interface Cluster {
  id: string;
  cluster: string;
  state: string;
  craft: string;
  artisans: number;
  listings: number;
  orders: number;
  gmv: number;
  lift: number;
}

export const clusters: Cluster[] = [
  { id: "c1", cluster: "Srinagar", state: "Jammu and Kashmir", craft: "Pashmina", artisans: 1284, listings: 4120, orders: 1860, gmv: 9840000, lift: 41.2 },
  { id: "c2", cluster: "Bagru", state: "Rajasthan", craft: "Block print", artisans: 2140, listings: 6890, orders: 3240, gmv: 7420000, lift: 38.7 },
  { id: "c3", cluster: "Bhuj", state: "Gujarat", craft: "Bandhani", artisans: 1670, listings: 5210, orders: 2410, gmv: 6180000, lift: 33.4 },
  { id: "c4", cluster: "Swamimalai", state: "Tamil Nadu", craft: "Bronze casting", artisans: 760, listings: 1840, orders: 690, gmv: 5940000, lift: 29.8 },
  { id: "c5", cluster: "Shantiniketan", state: "West Bengal", craft: "Kantha", artisans: 1890, listings: 5960, orders: 2870, gmv: 4310000, lift: 36.1 },
  { id: "c6", cluster: "Raghurajpur", state: "Odisha", craft: "Pattachitra", artisans: 1120, listings: 2740, orders: 980, gmv: 3860000, lift: 27.5 },
  { id: "c7", cluster: "Lucknow", state: "Uttar Pradesh", craft: "Chikankari", artisans: 2310, listings: 7420, orders: 3610, gmv: 3540000, lift: 24.9 },
  { id: "c8", cluster: "Channapatna", state: "Karnataka", craft: "Lacquer toys", artisans: 1580, listings: 3980, orders: 1740, gmv: 2970000, lift: 22.3 },
];

/** Where a listing ends up once it is published. */
export const channels = [
  { channel: "ONDC", share: 34, orders: 4820 },
  { channel: "WhatsApp", share: 27, orders: 3830 },
  { channel: "Meta catalog", share: 21, orders: 2980 },
  { channel: "GeM", share: 12, orders: 1700 },
  { channel: "Direct", share: 6, orders: 851 },
];

export const passportStats = {
  issued: 38420,
  scanned: 11294,
  verified: 11041,
};

export function inr(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}

export function crore(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return inr(value);
}
