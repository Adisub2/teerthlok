
export enum UserRole {
  PILGRIM = 'PILGRIM',
  TOURIST = 'TOURIST',
  ADMIN = 'ADMIN',
  GOVERNMENT = 'GOVERNMENT'
}

export interface Destination {
  id: string;
  name: string;
  category: string;
  region: string;
  description: string;
  spiritualSignificance: string;
  mythology: string;
  rituals: string[];
  bestTime: string;
  image: string;
  coordinates: { lat: number; lng: number };
  crowdLevel: number; // 0-100
  rating: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AnalyticsData {
  footfall: number[];
  labels: string[];
  revenue: number;
  emergencyAlerts: number;
}
