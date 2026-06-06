export interface EventDate {
  id: string;
  label: string;
  date: string; // ISO string
  time: string;
  location: string;
  spotsTotal: number;
  spotsLeft: number;
  soldOut?: boolean;
}

export interface PricingTier {
  solo: number;
  duo: number;
  group3: number;
  group4plus: number;
}

export interface Organizer {
  name: string;
  avatar: string;
  role: string;
  events: number;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  email?: string;
}

export interface EventImage {
  src: string;
  alt: string;
}

export interface MapLocation {
  lat: number;
  lng: number;
  address: string;
  landmark?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: EventCategory;
  tags: string[];
  description: string;
  highlights: string[];
  schedule: ScheduleItem[];
  whatToBring: string[];
  rules: string[];
  coverImage: string;
  images: string[];
  dates: EventDate[];
  pricing: PricingTier;
  earlyBird?: {
    active: boolean;
    pricing: PricingTier;
    label: string;
    limit: number; // first N spots
  };
  mapLocation: MapLocation;
  organizer: Organizer;
  upiId: string;
  qrCode?: string;
  featured?: boolean;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  minAge?: number;
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export type EventCategory =
  | 'Football'
  | 'Cricket'
  | 'Basketball'
  | 'Tennis'
  | 'Running'
  | 'Yoga'
  | 'Social'
  | 'Music'
  | 'Workshop';

export interface Attendee {
  name: string;
  phone: string;
  email: string;
  age: string;
  emergencyContact?: string;
}

export type GroupType = 'solo' | 'duo' | 'group3' | 'group4plus';

export interface GroupOption {
  type: GroupType;
  label: string;
  size: number;
  description: string;
}

export interface RegistrationData {
  eventId: string;
  eventSlug: string;
  selectedDate: EventDate;
  groupType: GroupType;
  groupSize: number;
  attendees: Attendee[];
  totalAmount: number;
  paymentScreenshot?: string;
  timestamp: number;
}

export interface PriceBreakdown {
  perPerson: number;
  total: number;
  earlyBirdCount: number;
  fullPriceCount: number;
  earlyBirdPrice: number;
  fullPrice: number;
}
