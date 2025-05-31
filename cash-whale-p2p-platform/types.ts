
import { LucideIcon } from 'lucide-react';

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface User {
  id: number;
  email: string;
  password?: string; // Password should ideally not be stored in client state long-term
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  creditScore: number;
  totalLent: number;
  totalBorrowed: number;
  activeLoans: number;
  completedTransactions: number;
  rating: number;
  balance: number;
  joinDate: string; // ISO date string
  identityVerified: 'Verified' | 'Pending' | 'Not Verified' | 'Failed';
  bankConnected: boolean;
  avatar: string;
  profileImageUrl: string | null;
  gender: string;
  birthday: string; // ISO date string or YYYY-MM-DD
  maritalStatus: string;
  educationLevel: string;
  workPosition: string;
  emergencyContact1: EmergencyContact;
  emergencyContact2: EmergencyContact;
  kycDocsStatus: 'Completed' | 'Pending' | 'Fill Up' | 'Failed';
  personalInfoStatus: 'Completed' | 'Fill Up';
  bankCardStatus: 'Completed' | 'Fill Up';
}

export interface LoanOpportunity {
  id: string | number;
  borrowerId: number;
  borrowerName: string;
  amount: number;
  purpose: string;
  purposeIcon: LucideIcon;
  proposedInterestRate: number;
  duration: number; // months
  creditScore: number;
  funded: number; // percentage
  funders: number;
  monthlyIncome: number;
  employmentType: string;
  timePosted: string; // e.g., "2 days ago", "Just now"
  avatar: string;
}

export interface MyLoan {
  id: string;
  type: 'lent' | 'borrowed';
  borrowerName?: string; // if type is 'lent'
  borrowerId?: number;
  lenderName?: string; // if type is 'borrowed'
  lenderId?: number | string; // string for "Cash Whale Pool"
  amount: number;
  interestRate: number;
  monthlyReturn?: number; // if type is 'lent'
  monthlyPayment?: number; // if type is 'borrowed'
  remainingMonths: number;
  totalMonths: number;
  status: 'active' | 'paid' | 'defaulted';
  nextPayment?: string; // ISO date string
  totalReturns?: number; // if type is 'lent'
  totalPaid?: number; // if type is 'borrowed'
}

export interface Property {
  id: string;
  title: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  bedrooms: number;
  bathrooms: number;
  squareMeterage: number;
  description: string;
  imageUrls: string[];
  status: 'available' | 'unavailable' | 'pending' | 'sold' | 'rented';
  dateListed: string; // ISO datetime string
}

export interface RentalProperty extends Property {
  rentAmount: number;
  landlordId: number;
  landlordName: string;
  amenities: string[];
}

export interface SaleProperty extends Property {
  price: number;
  sellerId: number;
  sellerName: string;
  propertyType: string; // e.g., 'House', 'Condo/Loft'
}

export interface NotificationMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  senderId: number;
  text: string;
  timestamp: string; // ISO datetime string
}

export interface Conversation {
  id: string;
  participants: number[];
  participantNames: { [key: number]: string };
  messages: ChatMessage[];
  lastMessagePreview?: string;
  lastMessageTimestamp?: string; 
}

export interface TabItem {
  icon: LucideIcon;
  label: string;
  tabName: string;
}

export type ActiveTab = 'dashboard' | 'lend' | 'borrow' | 'myLoans' | 'rentals' | 'sales' | 'messages' | 'profile';
export type AuthMode = 'signin' | 'signup';

export type ContractType = 'loan' | 'rental';
export interface ContractData {
  lenderName?: string;
  lenderId?: number | string;
  borrowerName?: string;
  borrowerId?: number;
  loanAmount?: number;
  interestRate?: number;
  durationMonths?: number;
  landlordName?: string;
  tenantName?: string;
  propertyAddress?: string;
  rentAmount?: number;
  leaseStartDate?: string;
  leaseEndDate?: string;
  securityDeposit?: number;
  date: string; // Date of contract generation/signing
}
