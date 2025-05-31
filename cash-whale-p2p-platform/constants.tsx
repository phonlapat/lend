
import {
  Home as HomeIcon, // Renamed to avoid conflict with Home component if any
  TrendingUp,
  PiggyBank,
  Building,
  FileText,
  User,
  DollarSign,
  MessageSquare,
  Tag,
  LucideIcon
} from 'lucide-react';
import { TabItem, ActiveTab } from './types'; // Import ActiveTab type

// Global style for inputs in modals for consistency
export const MODAL_INPUT_STYLE: string = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed";
export const MODAL_TEXTAREA_STYLE: string = `${MODAL_INPUT_STYLE} min-h-[80px]`;
export const MODAL_SELECT_STYLE: string = MODAL_INPUT_STYLE;

export const MAIN_NAV_ITEMS: TabItem[] = [
  { icon: HomeIcon, label: "Dashboard", tabName: "dashboard" },
  { icon: TrendingUp, label: "Lend Money", tabName: "lend" },
  { icon: PiggyBank, label: "Borrow Money", tabName: "borrow" },
  { icon: Building, label: "Rentals", tabName: "rentals" },
  { icon: Tag, label: "For Sale", tabName: "sales"},
  { icon: FileText, label: "My Activity", tabName: "myLoans" },
  { icon: MessageSquare, label: "Messages", tabName: "messages"},
  { icon: User, label: "Profile", tabName: "profile" },
];

export const MOBILE_NAV_ITEMS: TabItem[] = [
    { icon: HomeIcon, label: "Dashboard", tabName: "dashboard" },
    { icon: TrendingUp, label: "Lend", tabName: "lend" },
    { icon: PiggyBank, label: "Borrow", tabName: "borrow" },
    { icon: Building, label: "Rentals", tabName: "rentals" },
    { icon: User, label: "Profile", tabName: "profile" },
];

export const LOAN_PURPOSE_OPTIONS: string[] = [
  'Business', 'Small Business Expansion', 'Education', 'Home Improvement', 
  'Debt Consolidation', 'Medical', 'Personal', 'Other'
];

export const EMPLOYMENT_TYPE_OPTIONS: string[] = [
  'Full-time', 'Part-time', 'Self-employed', 'Contract', 
  'Unemployed', 'Student', 'Other'
];

export const LOAN_DURATION_OPTIONS: number[] = [6, 12, 18, 24, 36];

export const PROPERTY_TYPE_OPTIONS: string[] = [
  'House', 'Apartment', 'Condo/Loft', 'Townhouse', 'Land', 'Other'
];

export const DEFAULT_USER_AVATAR_COLORS: string[] = [
  'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];

export const getPurposeIcon = (purpose: string): LucideIcon => {
  const icons: { [key: string]: LucideIcon } = {
    'Business': Building,
    'Small Business Expansion': Building,
    'Education': DollarSign, // Placeholder, consider GraduationCap if added
    'Home Improvement': HomeIcon,
    'Debt Consolidation': DollarSign, // Placeholder, consider CreditCard if added
    'Medical': DollarSign, // Placeholder, consider Shield if added
    'Other': DollarSign, // Placeholder, consider ShoppingCart if added
    'Personal': DollarSign, // Placeholder, consider ShoppingCart if added
  };
  return icons[purpose] || DollarSign; // Default icon
};
