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
    label: "Registered producers",
    value: "12,847",
    change: 8.4,
    trend: "up",
    note: "Across 12 states and 4 verticals",
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

/** Median monthly producer income, at intake and now. */
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
  { id: "sr", name: "Senior citizen producers", beneficiaries: 940, target: 1200 },
  { id: "shg", name: "DAY-NRLM SHG members", beneficiaries: 3260, target: 5000 },
];

export interface Cluster {
  id: string;
  cluster: string;
  state: string;
  craft: string;
  vertical: string;
  artisans: number;
  listings: number;
  orders: number;
  gmv: number;
  lift: number;
}

export const clusters: Cluster[] = [
  { id: "c1", cluster: "Srinagar", state: "Jammu and Kashmir", craft: "Pashmina", vertical: "Handicraft", artisans: 1284, listings: 4120, orders: 1860, gmv: 9840000, lift: 41.2 },
  { id: "c2", cluster: "Pochampally", state: "Telangana", craft: "Ikat sarees", vertical: "Handloom", artisans: 1960, listings: 5480, orders: 2690, gmv: 8120000, lift: 37.9 },
  { id: "c3", cluster: "Bagru", state: "Rajasthan", craft: "Block print", vertical: "Handicraft", artisans: 2140, listings: 6890, orders: 3240, gmv: 7420000, lift: 38.7 },
  { id: "c4", cluster: "Wayanad", state: "Kerala", craft: "Spices and pickles (SHGs)", vertical: "SHG food", artisans: 2380, listings: 3910, orders: 4120, gmv: 5260000, lift: 31.6 },
  { id: "c7", cluster: "Shantiniketan", state: "West Bengal", craft: "Kantha", vertical: "Handicraft", artisans: 1890, listings: 5960, orders: 2870, gmv: 4310000, lift: 36.1 },
  { id: "c5", cluster: "Bastar", state: "Chhattisgarh", craft: "Forest honey and mahua", vertical: "Forest produce", artisans: 1450, listings: 1620, orders: 1980, gmv: 3980000, lift: 44.8 },
  { id: "c6", cluster: "Moradabad (rural belt)", state: "Uttar Pradesh", craft: "Brassware units", vertical: "Micro-manufacturing", artisans: 870, listings: 2240, orders: 1130, gmv: 3720000, lift: 21.4 },
  { id: "c8", cluster: "Channapatna", state: "Karnataka", craft: "Lacquer toys", vertical: "Handicraft", artisans: 1580, listings: 3980, orders: 1740, gmv: 2970000, lift: 22.3 },
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
