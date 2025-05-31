
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  DollarSign, TrendingUp, Shield, Users, Star, Clock, ArrowUpRight, ArrowDownLeft,
  Plus, Search, Filter, CreditCard, CheckCircle, AlertCircle, User as UserIcon, Settings,
  Bell, Eye, EyeOff, LogOut, Calendar, FileText, Upload, X, Check, Send,
  MessageSquare, Phone, Mail, MapPin, Building, GraduationCap, Home as HomeModernIcon, ShoppingCart,
  Zap, PiggyBank, RotateCcw, Camera, Sparkles, BedDouble, Bath, Maximize, HomeIcon, Briefcase, ExternalLink, SortAsc, SortDesc, Trash2, Lightbulb, Image as ImageIcon, MessageCircle as MessageCircleIcon, Edit3, Info, ChevronRight, ShieldCheck, UserCheck, Landmark, Tag, ListChecks, DollarSignIcon, Building2, MessageSquareIcon as ChatIcon, LucideIcon
} from 'lucide-react';

import { User, LoanOpportunity, MyLoan, RentalProperty, SaleProperty, NotificationMessage, Conversation, ChatMessage, ActiveTab, AuthMode, ContractData, ContractType, TabItem } from './types';
import { MODAL_INPUT_STYLE, MAIN_NAV_ITEMS, MOBILE_NAV_ITEMS, getPurposeIcon, LOAN_PURPOSE_OPTIONS, EMPLOYMENT_TYPE_OPTIONS, LOAN_DURATION_OPTIONS, PROPERTY_TYPE_OPTIONS } from './constants';
import { generateTextContent } from './services/geminiService';

// Import sub-components (assuming they will be created in these paths)
// For simplicity of this single-file response, these components would be defined below or App.tsx itself would be much larger.
// In a multi-file setup, these would be actual imports.
// For this exercise, we will define these components within this file or assume they are accessible.
// To adhere to "handful of files", we will define components further down or make App.tsx very large.
// Given the prompt to avoid defining components inside parent function body, we'll define them outside `App` below.

// Placeholder components to satisfy structure. Actual implementations would be extensive.
// These will be implemented based on user's original code.

const AuthScreenComponent: React.FC<any> = ({ setAuthMode, handleAuth, addNotification, authMode }) => {
  const [formData, setFormData] = useState({ email: '', password: '', firstName: '', lastName: '', phone: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); if (!formData.email || !formData.password || (authMode === 'signup' && (!formData.firstName || !formData.lastName || !formData.phone))) { addNotification('Please fill in all required fields.', 'error'); return; } handleAuth(formData.email, formData.password, formData); };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 font-inter">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Cash Whale</h1>
          <p className="text-gray-600 mt-2">Peer-to-Peer Lending, Rentals & Sales</p>
        </div>
        <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setAuthMode('signin')} className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all ${authMode === 'signin' ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:text-blue-600'}`}>Sign In</button>
          <button onClick={() => setAuthMode('signup')} className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all ${authMode === 'signup' ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:text-blue-600'}`}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {authMode === 'signup' && (
            <>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">First Name</label><input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="Enter your first name" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label><input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="Enter your last name" /></div>
            </>
          )}
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="Enter your email" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" name="password" required value={formData.password} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="Enter your password" /></div>
          {authMode === 'signup' && (<div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="e.g., 081-234-5678" /></div>)}
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{authMode === 'signin' ? 'Sign In' : 'Create Account'}</button>
        </form>
        {authMode === 'signin' && (<div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center"><p className="text-sm text-blue-700">Demo: <strong>sarah@example.com</strong> / <strong>password123</strong></p></div>)}
      </div>
    </div>
  );
};

// Define other components like DashboardComponent, LendMarketplaceComponent etc. here, outside App
// For brevity in this combined response, their logic will be based on the user's original CashWhaleApp sub-sections.

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [showBalance, setShowBalance] = useState<boolean>(true);

  const [loanApplicationModal, setLoanApplicationModal] = useState<boolean>(false);
  const [lendingModal, setLendingModal] = useState<boolean>(false);
  const [lendingStep, setLendingStep] = useState<string>('amountEntry');
  const [selectedLoanForLending, setSelectedLoanForLending] = useState<LoanOpportunity | null>(null);

  const [rentalApplicationModal, setRentalApplicationModal] = useState<boolean>(false);
  const [selectedRental, setSelectedRental] = useState<RentalProperty | null>(null);
  const [mockRentalApplied, setMockRentalApplied] = useState<boolean>(false);
  const [listPropertyModal, setListPropertyModal] = useState<boolean>(false);

  const [salesApplicationModal, setSalesApplicationModal] = useState<boolean>(false); // Placeholder if needed for sales
  const [selectedSaleProperty, setSelectedSaleProperty] = useState<SaleProperty | null>(null);
  const [listPropertyForSaleModal, setListPropertyForSaleModal] = useState<boolean>(false);

  const [generatedContractText, setGeneratedContractText] = useState<string>('');
  const [showContractModal, setShowContractModal] = useState<boolean>(false);
  const [contractTypeForModal, setContractTypeForModal] = useState<ContractType | ''>('');
  const [contractDataForModal, setContractDataForModal] = useState<ContractData | null>(null);
  const [isGeneratingContract, setIsGeneratingContract] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [showAIInsightModal, setShowAIInsightModal] = useState<boolean>(false);
  const [selectedLoanForInsight, setSelectedLoanForInsight] = useState<LoanOpportunity | null>(null);
  const [aiInsightText, setAiInsightText] = useState<string>('');
  const [isFetchingAIInsight, setIsFetchingAIInsight] = useState<boolean>(false);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');

  // Initial Data (from user's code)
  const [usersDB, setUsersDB] = useState<User[]>([
    { id: 1, email: 'sarah@example.com', password: 'password123', firstName: 'Sarah', lastName: 'Chen', phone: '081-234-5678', streetAddress: '123 Main St', city: 'San Francisco', province: 'CA', postalCode: '94107', creditScore: 750, totalLent: 15000, totalBorrowed: 8500, activeLoans: 2, completedTransactions: 27, rating: 4.8, balance: 2340.50, joinDate: '2023-01-15', identityVerified: 'Verified', bankConnected: true, avatar: 'SC', profileImageUrl: null, gender: 'Female', birthday: '1990-05-15', maritalStatus: 'Single', educationLevel: "Master's Degree", workPosition: 'Software Engineer', emergencyContact1: { name: 'Michael Chen', phone: '082-345-6789', relationship: 'Brother' }, emergencyContact2: { name: 'Emily White', phone: '083-456-7890', relationship: 'Friend' }, kycDocsStatus: 'Completed', personalInfoStatus: 'Completed', bankCardStatus: 'Completed' },
    { id: 2, email: 'alex@example.com', password: 'password123', firstName: 'Alex', lastName: 'Johnson', phone: '092-345-6789', streetAddress: '456 Oak Ave', city: 'Austin', province: 'TX', postalCode: '78701', creditScore: 720, totalLent: 8000, totalBorrowed: 12000, activeLoans: 0, completedTransactions: 18, rating: 4.6, balance: 1850.25, joinDate: '2023-03-22', identityVerified: 'Pending', bankConnected: true, avatar: 'AJ', profileImageUrl: null, gender: 'Male', birthday: '1988-11-02', maritalStatus: 'Married', educationLevel: "Bachelor's Degree", workPosition: 'Product Manager', emergencyContact1: { name: '', phone: '', relationship: '' }, emergencyContact2: { name: '', phone: '', relationship: '' }, kycDocsStatus: 'Pending', personalInfoStatus: 'Fill Up', bankCardStatus: 'Fill Up'},
    { id: 3, email: 'jennifer@example.com', password: 'password123', firstName: 'Jennifer', lastName: 'Walsh', phone: '099-888-7777', streetAddress: '777 Pine St', city: 'San Francisco', province: 'CA', postalCode: '94108', creditScore: 680, totalLent: 0, totalBorrowed: 3000, activeLoans: 1, completedTransactions: 5, rating: 4.3, balance: 500.00, joinDate: '2024-01-10', identityVerified: 'Verified', bankConnected: true, avatar: 'JW', profileImageUrl: null, gender: 'Female', birthday: '1992-07-20', maritalStatus: 'Single', educationLevel: "Bachelor's Degree", workPosition: 'Marketing Specialist', emergencyContact1: { name: 'David Lee', phone: '098-765-4321', relationship: 'Friend' }, emergencyContact2: { name: '', phone: '', relationship: '' }, kycDocsStatus: 'Completed', personalInfoStatus: 'Completed', bankCardStatus: 'Completed' }
  ]);

  const [loanOpportunities, setLoanOpportunities] = useState<LoanOpportunity[]>([
    { id: 1, borrowerId: 3, borrowerName: "Jennifer Walsh", amount: 5000, purpose: "Small Business Expansion", purposeIcon: Building, proposedInterestRate: 8.5, duration: 12, creditScore: 680, funded: 65, funders: 12, monthlyIncome: 4500, employmentType: "Self-employed", timePosted: "2 days ago", avatar: "JW" },
    { id: 2, borrowerId: 4, borrowerName: "Maria Garcia", amount: 2500, purpose: "Home Improvement", purposeIcon: HomeModernIcon, proposedInterestRate: 7.2, duration: 6, creditScore: 780, funded: 30, funders: 8, monthlyIncome: 6200, employmentType: "Full-time", timePosted: "5 hours ago", avatar: "MG" },
  ]);

  const [myLoans, setMyLoans] = useState<MyLoan[]>([
    { id: "lent-1", type: "lent", borrowerName: "Jennifer Walsh", borrowerId: 3, lenderId: 1, amount: 3000, interestRate: 7.5, monthlyReturn: 268.75, remainingMonths: 8, totalMonths: 12, status: "active", nextPayment: "2025-06-01", totalReturns: 1075.00, },
    { id: "borrowed-1", type: "borrowed", borrowerId: 1, lenderName: "Cash Whale Pool", amount: 5000, interestRate: 8.2, monthlyPayment: 435.45, remainingMonths: 10, totalMonths: 12, status: "active", nextPayment: "2025-06-01", totalPaid: 870.90 }
  ]);

  const [rentalProperties, setRentalProperties] = useState<RentalProperty[]>([
    { id: 'rental-1', title: 'Spacious Downtown Apartment', streetAddress: '789 Market St', city: 'San Francisco', province: 'CA', postalCode: '94103', rentAmount: 3200, bedrooms: 2, bathrooms: 2, squareMeterage: 102, description: 'Modern 2 bed, 2 bath apartment in the heart of downtown. Features an open floor plan, updated kitchen, and city views. Building amenities include a gym and rooftop terrace.', imageUrls: ['https://picsum.photos/600/400?random=1', 'https://picsum.photos/600/400?random=2'], landlordId: 2, landlordName: 'Alex Johnson', status: 'available', amenities: ['Gym', 'Rooftop Terrace', 'In-unit Laundry', 'Parking'], dateListed: '2025-05-20T10:00:00Z' },
    { id: 'rental-2', title: 'Cozy Suburban House', streetAddress: '101 Pine Ln', city: 'Austin', province: 'TX', postalCode: '78704', rentAmount: 2500, bedrooms: 3, bathrooms: 2, squareMeterage: 167, description: 'Charming 3-bedroom house with a large backyard, perfect for families. Located in a quiet neighborhood with easy access to parks and schools.', imageUrls: ['https://picsum.photos/600/400?random=3'], landlordId: 1, landlordName: 'Sarah Chen', status: 'available', amenities: ['Large Backyard', 'Garage', 'Pet Friendly', 'Dishwasher'], dateListed: '2025-05-15T14:30:00Z' },
  ]);
  
  const [propertiesForSale, setPropertiesForSale] = useState<SaleProperty[]>([
    { id: 'sale-1', title: 'Charming Victorian Home', streetAddress: '321 Oak St', city: 'San Francisco', province: 'CA', postalCode: '94117', price: 1250000, bedrooms: 3, bathrooms: 2, squareMeterage: 180, description: 'Beautifully maintained Victorian with original details and modern updates. Features a gourmet kitchen, spacious living areas, and a lovely garden. Prime location!', imageUrls: ['https://picsum.photos/600/400?random=4', 'https://picsum.photos/600/400?random=5'], sellerId: 1, sellerName: 'Sarah Chen', status: 'available', dateListed: '2025-05-22T09:00:00Z', propertyType: 'House' },
    { id: 'sale-2', title: 'Modern Downtown Loft', streetAddress: '900 Main St, Unit 5B', city: 'Austin', province: 'TX', postalCode: '78701', price: 650000, bedrooms: 1, bathrooms: 1.5, squareMeterage: 95, description: 'Sleek and stylish loft in a converted warehouse. Open concept living, high ceilings, polished concrete floors, and city skyline views. Walk to everything!', imageUrls: ['https://picsum.photos/600/400?random=6'], sellerId: 2, sellerName: 'Alex Johnson', status: 'available', dateListed: '2025-05-18T16:00:00Z', propertyType: 'Condo/Loft' },
  ]);

  // --- Handlers and Logic ---
  const addNotification = useCallback((message: string, type: NotificationMessage['type'] = 'info') => {
    const notification: NotificationMessage = { id: Date.now(), message, type, timestamp: new Date() };
    setNotifications(prev => [notification, ...prev].slice(0, 10)); // Keep last 10
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 6000);
  }, []);

  const handleAuth = useCallback((email: string, password_input: string, userData?: any) => {
    if (authMode === 'signin') {
      const user = usersDB.find(u => u.email === email && u.password === password_input);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        if (user.id === 1) { // Sarah Chen specific mock data
          setMyLoans([ 
            { id: "lent-1", type: "lent", borrowerName: "Jennifer Walsh", borrowerId: 3, lenderId: 1, amount: 3000, interestRate: 7.5, monthlyReturn: 268.75, remainingMonths: 8, totalMonths: 12, status: "active", nextPayment: "2025-06-01", totalReturns: 1075.00 },
            { id: "borrowed-1", type: "borrowed", borrowerId: 1, lenderName: "Cash Whale Pool", amount: 5000, interestRate: 8.2, monthlyPayment: 435.45, remainingMonths: 10, totalMonths: 12, status: "active", nextPayment: "2025-06-01", totalPaid: 870.90 }
          ]);
        } else {
          setMyLoans([]); // Reset for other users
        }
        addNotification(`Welcome back, ${user.firstName}!`, 'success');
      } else {
        addNotification('Invalid credentials. Try sarah@example.com / password123', 'error');
      }
    } else { // signup
      if (usersDB.find(u => u.email === email)) {
        addNotification('Email already exists. Please sign in or use a different email.', 'error');
        return;
      }
      const newUserId = usersDB.length > 0 ? Math.max(...usersDB.map(u => u.id)) + 1 : 1;
      const newUser: User = {
        id: newUserId, email, password: password_input, 
        firstName: userData.firstName, lastName: userData.lastName, phone: userData.phone,
        streetAddress: '', city: '', province: '', postalCode: '',
        creditScore: Math.floor(Math.random() * 250) + 550, // Random score 550-800
        totalLent: 0, totalBorrowed: 0, activeLoans: 0, completedTransactions: 0,
        rating: parseFloat((Math.random() * 0.5 + 4.5).toFixed(1)), // Rating 4.5-5.0
        balance: 100.00, // Welcome balance
        joinDate: new Date().toISOString().split('T')[0],
        identityVerified: 'Not Verified', bankConnected: false,
        avatar: `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase(),
        profileImageUrl: null,
        gender: '', birthday: '', maritalStatus: '', educationLevel: '', workPosition: '',
        emergencyContact1: { name: '', phone: '', relationship: '' },
        emergencyContact2: { name: '', phone: '', relationship: '' },
        kycDocsStatus: 'Fill Up', personalInfoStatus: 'Fill Up', bankCardStatus: 'Fill Up'
      };
      setUsersDB(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      setMyLoans([]);
      addNotification('Welcome to Cash Whale! Complete your profile to get started.', 'success');
    }
  }, [authMode, usersDB, addNotification]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
    addNotification('You have been logged out.', 'info');
    setShowNotificationPanel(false);
  }, [addNotification]);

  const calculateReferenceInterestRate = useCallback((creditScore: number, durationMonths: number): number => {
    let baseRate = 12;
    if (creditScore >= 800) baseRate = 5.5;
    else if (creditScore >= 750) baseRate = 6.5;
    else if (creditScore >= 700) baseRate = 8.0;
    else if (creditScore >= 650) baseRate = 9.5;
    const durationAdjustment = durationMonths > 12 ? (durationMonths > 24 ? 1.0 : 0.5) : 0;
    return parseFloat((baseRate + durationAdjustment).toFixed(1));
  }, []);

  const submitLoanApplication = useCallback((applicationData: any) => {
    if (!currentUser) return;
    const newLoanRequest: LoanOpportunity = {
      id: `loanReq-${Date.now()}`,
      borrowerId: currentUser.id,
      borrowerName: `${currentUser.firstName} ${currentUser.lastName}`,
      amount: parseInt(applicationData.amount),
      purpose: applicationData.purpose,
      purposeIcon: getPurposeIcon(applicationData.purpose),
      proposedInterestRate: parseFloat(applicationData.proposedInterestRate),
      duration: parseInt(applicationData.duration),
      creditScore: currentUser.creditScore,
      funded: 0,
      funders: 0,
      monthlyIncome: parseInt(applicationData.income) || 0,
      employmentType: applicationData.employmentType,
      timePosted: "Just now",
      avatar: currentUser.avatar
    };
    setLoanOpportunities(prev => [newLoanRequest, ...prev]);
    setLoanApplicationModal(false);
    addNotification(`Your loan request for $${applicationData.amount.toLocaleString()} has been posted!`, 'success');
  }, [currentUser, addNotification]);

  const cancelLoanRequest = useCallback((loanId: string | number) => {
    setLoanOpportunities(prev => prev.filter(loan => loan.id !== loanId));
    addNotification('Your loan request has been cancelled.', 'success');
  }, [addNotification]);

  const finalizeLending = useCallback((loanId: string | number, principalAmount: number, feePaid: number) => {
    if (!currentUser || !selectedLoanForLending) return;
    setLoanOpportunities(prevOpportunities =>
      prevOpportunities.map(loan => {
        if (loan.id === loanId) {
          const currentFundedAmount = (loan.amount * loan.funded) / 100;
          const newFundedAmount = currentFundedAmount + principalAmount;
          const newFundedPercentage = Math.min(100, (newFundedAmount / loan.amount) * 100);
          return { ...loan, funded: parseFloat(newFundedPercentage.toFixed(2)), funders: loan.funders + 1 };
        }
        return loan;
      })
    );

    const monthlyPrincipalRepayment = principalAmount / selectedLoanForLending.duration;
    const monthlyInterest = (principalAmount * selectedLoanForLending.proposedInterestRate / 100) / 12;
    const calculatedMonthlyReturn = monthlyPrincipalRepayment + monthlyInterest;

    const newLentLoan: MyLoan = {
      id: `lent-${Date.now()}`, type: "lent",
      borrowerName: selectedLoanForLending.borrowerName, borrowerId: selectedLoanForLending.borrowerId,
      lenderId: currentUser.id, amount: principalAmount,
      interestRate: selectedLoanForLending.proposedInterestRate,
      monthlyReturn: parseFloat(calculatedMonthlyReturn.toFixed(2)),
      remainingMonths: selectedLoanForLending.duration, totalMonths: selectedLoanForLending.duration,
      status: "active",
      nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalReturns: 0
    };
    setMyLoans(prev => [...prev, newLentLoan]);
    setCurrentUser(prevUser => {
      if (!prevUser) return null;
      return { ...prevUser, totalLent: prevUser.totalLent + principalAmount, activeLoans: prevUser.activeLoans + 1, balance: prevUser.balance - principalAmount - feePaid }; // Deduct principal & fee
    });
    setLendingModal(false);
    setSelectedLoanForLending(null);
    setLendingStep('amountEntry');
    addNotification(`Successfully lent $${principalAmount.toLocaleString()} to ${newLentLoan.borrowerName}! (Fee: $${feePaid.toFixed(2)})`, 'success');
  }, [currentUser, selectedLoanForLending, addNotification]);

  const handleListProperty = useCallback((propertyData: any) => {
    if (!currentUser) { addNotification("You must be logged in to list a property.", "error"); return; }
    const newProperty: RentalProperty = {
      id: `rental-${Date.now()}`,
      title: propertyData.title,
      streetAddress: propertyData.streetAddress,
      city: propertyData.city,
      province: propertyData.province,
      postalCode: propertyData.postalCode,
      rentAmount: parseFloat(propertyData.rentAmount),
      bedrooms: parseInt(propertyData.bedrooms),
      bathrooms: parseInt(propertyData.bathrooms),
      squareMeterage: parseInt(propertyData.squareMeterage),
      description: propertyData.description,
      imageUrls: propertyData.imageUrls, // Assuming this is an array of strings (data URLs or remote URLs)
      landlordId: currentUser.id,
      landlordName: `${currentUser.firstName} ${currentUser.lastName}`,
      status: 'available',
      amenities: propertyData.amenities.split(',').map((a:string) => a.trim()).filter((a:string) => a),
      dateListed: new Date().toISOString()
    };
    setRentalProperties(prev => [newProperty, ...prev]);
    setListPropertyModal(false);
    addNotification(`${propertyData.title} has been listed for rent!`, 'success');
  }, [currentUser, addNotification]);

  const handleListPropertyForSale = useCallback((propertyData: any) => {
    if (!currentUser) { addNotification("You must be logged in to list a property.", "error"); return; }
    const newSaleProperty: SaleProperty = {
      id: `sale-${Date.now()}`,
      title: propertyData.title,
      streetAddress: propertyData.streetAddress,
      city: propertyData.city,
      province: propertyData.province,
      postalCode: propertyData.postalCode,
      price: parseFloat(propertyData.price),
      bedrooms: parseInt(propertyData.bedrooms),
      bathrooms: parseInt(propertyData.bathrooms),
      squareMeterage: parseInt(propertyData.squareMeterage),
      description: propertyData.description,
      imageUrls: propertyData.imageUrls,
      sellerId: currentUser.id,
      sellerName: `${currentUser.firstName} ${currentUser.lastName}`,
      status: 'available',
      dateListed: new Date().toISOString(),
      propertyType: propertyData.propertyType
    };
    setPropertiesForSale(prev => [newSaleProperty, ...prev]);
    setListPropertyForSaleModal(false);
    addNotification(`${propertyData.title} has been listed for sale!`, 'success');
  }, [currentUser, addNotification]);


  const handleGenerateContract = useCallback(async (type: ContractType, data: ContractData) => {
    if (!currentUser) { addNotification('User not found.', 'error'); return; }
    setIsGeneratingContract(true);
    addNotification('Generating contract with AI...', 'info');
    setGeneratedContractText('');
    setContractTypeForModal(type); // Set type for modal title
    setContractDataForModal(data); // Set data for download filename

    let prompt = "";
    if (type === 'loan') {
      prompt = `Generate a simple P2P loan agreement reference text. This is for informational purposes only and not a legally binding document without professional review. Loan Details: - Lender: ${data.lenderName} (Lender ID: ${data.lenderId || 'N/A'}) - Borrower: ${data.borrowerName} (Borrower ID: ${data.borrowerId || 'N/A'}) - Loan Amount: $${data.loanAmount?.toLocaleString()} - Interest Rate: ${data.interestRate}% APR - Loan Duration: ${data.durationMonths} months - Loan Date: ${data.date}. Include sections for: Parties, Loan Amount and Disbursement, Interest, Repayment Schedule (e.g., "Monthly payments of principal and interest for ${data.durationMonths} months"), Late Payment (e.g., "A late fee may apply"), Default, Governing Law (e.g., "State of [Your State/Jurisdiction]"), and a section for Signatures (Lender & Borrower). Keep it concise.`;
    } else if (type === 'rental') {
      prompt = `Generate a simple residential rental agreement reference text. This is for informational purposes only and not a legally binding document without professional review. Rental Details: - Landlord: ${data.landlordName} - Tenant: ${data.tenantName} - Property Address: ${data.propertyAddress} - Monthly Rent: $${data.rentAmount?.toLocaleString()} - Lease Term: From ${data.leaseStartDate} to ${data.leaseEndDate} - Security Deposit: $${data.securityDeposit?.toLocaleString()} - Agreement Date: ${data.date}. Include sections for: Parties, Property, Lease Term, Rent Payment (due date, method), Security Deposit, Use of Property, Maintenance and Repairs (general responsibilities), Pets (e.g., "No pets allowed" or specify conditions), Default, Governing Law (e.g., "State of [Property Location State/Jurisdiction]"), and a section for Signatures (Landlord & Tenant). Keep it concise.`;
    } else {
      addNotification('Invalid contract type.', 'error');
      setIsGeneratingContract(false);
      return;
    }

    try {
      const generatedText = await generateTextContent(prompt);
      setGeneratedContractText(generatedText);
      setShowContractModal(true);
      addNotification('Contract generated for reference!', 'success');
    } catch (error: any) {
      console.error('Error generating contract:', error);
      addNotification(`Error: ${error.message || 'Failed to generate contract.'}`, 'error');
      setGeneratedContractText('Failed to generate contract. Please try again.');
      setShowContractModal(true); // Still show modal with error
    } finally {
      setIsGeneratingContract(false);
    }
  }, [currentUser, addNotification]);

  const downloadContractText = useCallback((text: string, type: ContractType | '') => {
    if (!contractDataForModal || !type) return;
    const filename = type === 'loan' 
      ? `LoanAgreement_${contractDataForModal.borrowerName || 'Borrower'}_${contractDataForModal.lenderName || 'Lender'}_Ref.txt` 
      : `RentalAgreement_${contractDataForModal.tenantName || 'Tenant'}_Ref.txt`;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addNotification('Contract downloaded for reference.', 'success');
  }, [contractDataForModal, addNotification]);

  const handleFetchAIInsights = useCallback(async (loan: LoanOpportunity) => {
    if (!loan) return;
    setSelectedLoanForInsight(loan);
    setShowAIInsightModal(true);
    setIsFetchingAIInsight(true);
    setAiInsightText('');
    addNotification('Fetching AI insights for loan...', 'info');

    const principal = loan.amount;
    const rate = loan.proposedInterestRate / 100;
    const durationYears = loan.duration / 12;
    const totalInterest = principal * rate * durationYears;
    const totalRepayment = principal + totalInterest;
    const monthlyPayment = totalRepayment / loan.duration;

    const prompt = `As an AI assistant for a P2P lending platform, provide concise insights for a potential lender considering the following loan. This is NOT financial advice.
    Loan Details:
    - Loan Amount: $${principal.toLocaleString()}
    - Purpose: ${loan.purpose}
    - Borrower's Credit Score: ${loan.creditScore}
    - Proposed Interest Rate: ${loan.proposedInterestRate}% APR
    - Duration: ${loan.duration} months

    Please explain the following to the lender:
    1.  Repayment Structure: How will the lender get their money back? (e.g., "The borrower repays this loan in ${loan.duration} monthly installments. Each installment of approximately $${monthlyPayment.toFixed(2)} includes a portion of the principal and interest.")
    2.  Return & Profit: What is the total expected return and net profit? (e.g., "Over ${loan.duration} months, your total expected return would be approximately $${totalRepayment.toFixed(2)}, resulting in a net profit of about $${totalInterest.toFixed(2)}.")
    3.  Lender's Action: What does the lender need to do? (e.g., "To fund this loan, you would make a one-time transfer of $${principal.toLocaleString()}.")
    4.  Credit Score (General): Briefly, what does a credit score of ${loan.creditScore} on this platform generally indicate? (e.g., "A credit score of ${loan.creditScore} on CashWhale reflects an assessment of past financial behavior. A score of ${loan.creditScore} suggests [e.g., 'a reasonable credit history' or 'a strong repayment likelihood based on our platform's assessment criteria']. Higher scores generally indicate lower perceived risk, but all P2P lending involves risk.")
    
    Keep the entire response concise, ideally in 3-4 short paragraphs. Start with a clear disclaimer: "Disclaimer: This AI-generated insight is for informational purposes only and NOT financial advice. Investing in P2P loans involves risk, including the potential loss of principal. Please conduct your own due diligence."`;

    try {
      const insight = await generateTextContent(prompt);
      setAiInsightText(insight);
      addNotification('AI insights loaded!', 'success');
    } catch (error: any) {
      console.error('Error fetching AI insights:', error);
      setAiInsightText(`Error: ${error.message || 'Failed to fetch insights.'}`);
      addNotification(`Error: ${error.message || 'Failed to fetch insights.'}`, 'error');
    } finally {
      setIsFetchingAIInsight(false);
    }
  }, [addNotification]);
  
  const getOtherParticipant = useCallback((conversation: Conversation): User | null => {
    if (!currentUser || !conversation) return null;
    const otherParticipantId = conversation.participants.find(pId => pId !== currentUser.id);
    if (!otherParticipantId) return null;
    return usersDB.find(u => u.id === otherParticipantId) || null;
  }, [currentUser, usersDB]);

  const startOrSelectConversation = useCallback((otherUserId: number, otherUserNameFromContext?: string) => {
    if (!currentUser || currentUser.id === otherUserId) return;
    
    let conversation = conversations.find(conv => 
        conv.participants.includes(currentUser.id) && conv.participants.includes(otherUserId)
    );

    let PName = otherUserNameFromContext;
    if (!PName) { 
        const otherUser = usersDB.find(u => u.id === otherUserId);
        if (otherUser) PName = `${otherUser.firstName} ${otherUser.lastName}`;
        else PName = "Unknown User";
    }

    if (!conversation) {
        const newConversation: Conversation = {
            id: `conv-${Date.now()}-${currentUser.id}-${otherUserId}`,
            participants: [currentUser.id, otherUserId],
            participantNames: { 
                [currentUser.id]: `${currentUser.firstName} ${currentUser.lastName}`,
                [otherUserId]: PName 
            },
            messages: []
        };
        setConversations(prev => [newConversation, ...prev]);
        setSelectedConversationId(newConversation.id);
    } else {
        setSelectedConversationId(conversation.id);
    }
    setActiveTab('messages');
  }, [currentUser, conversations, usersDB]);

  const handleSendMessage = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId || !currentUser) return;
    const message: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        text: newMessage,
        timestamp: new Date().toISOString()
    };
    setConversations(prevConvs => prevConvs.map(conv => 
        conv.id === selectedConversationId ? {...conv, messages: [...conv.messages, message]} : conv
    ));
    setNewMessage('');
  }, [newMessage, selectedConversationId, currentUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversations, selectedConversationId]);


  // --- Conditional Rendering for Auth vs Main App ---
  if (!isAuthenticated) {
    return (
      <>
        <AuthScreenComponent 
          setAuthMode={setAuthMode} 
          handleAuth={handleAuth} 
          addNotification={addNotification} 
          authMode={authMode} 
        />
        <div className="fixed top-5 right-5 z-[100] w-full max-w-sm space-y-3">
          {notifications.slice(0, 1).map(n => (
            <div key={n.id} className={`p-4 rounded-lg shadow-xl border-l-4 flex items-start space-x-3 ${n.type === 'success' ? 'bg-green-100 border-green-500 text-green-800' : n.type === 'error' ? 'bg-red-100 border-red-500 text-red-800' : 'bg-blue-100 border-blue-500 text-blue-800'}`}>
              {n.type === 'success' ? <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" /> : n.type === 'error' ? <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <Bell className="w-5 h-5 mt-0.5 shrink-0" />}
              <p className="text-sm flex-1">{n.message}</p>
              <button onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))} className="text-current opacity-70 hover:opacity-100 shrink-0"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (!currentUser) { // Should not happen if isAuthenticated is true, but good for type safety
    return <div className="p-10 text-center text-gray-500">Loading user data or error...</div>;
  }

  // --- Main App Structure (Authenticated) ---
  // Define NavItem here as it's part of App's layout
  const NavItem: React.FC<{ icon: LucideIcon; label: string; tabName: ActiveTab; isActive: boolean; onClick: () => void; }> = ({ icon: Icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left transition-all group ${isActive ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}>
      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 transition-colors'}`} />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
  
  // Define renderContent function to switch views
  const renderContent = () => {
    // These components would be more fleshed out, taking props from App state
    // For now, they are simplified placeholders or will use the logic from original CashWhaleApp sections
    switch (activeTab) {
      case 'dashboard': return <DashboardComponent currentUser={currentUser} myLoans={myLoans} rentalProperties={rentalProperties} propertiesForSale={propertiesForSale} setActiveTab={setActiveTab} showBalance={showBalance} setShowBalance={setShowBalance} />;
      case 'lend': return <LendMarketplaceComponent currentUser={currentUser} loanOpportunities={loanOpportunities} setSelectedLoanForLending={setSelectedLoanForLending} setLendingModal={setLendingModal} setLendingStep={setLendingStep} handleFetchAIInsights={handleFetchAIInsights} startOrSelectConversation={startOrSelectConversation} />;
      case 'borrow': return <BorrowSectionComponent currentUser={currentUser} loanOpportunities={loanOpportunities} setLoanApplicationModal={setLoanApplicationModal} cancelLoanRequest={cancelLoanRequest} />;
      case 'myLoans': return <MyLoansSectionComponent currentUser={currentUser} myLoans={myLoans} setMyLoans={setMyLoans} setCurrentUser={setCurrentUser} addNotification={addNotification} handleGenerateContract={handleGenerateContract} isGeneratingContract={isGeneratingContract} contractDataForModal={contractDataForModal} setActiveTab={setActiveTab} />;
      case 'rentals': return <RentalMarketplaceComponent currentUser={currentUser} rentalProperties={rentalProperties} setListPropertyModal={setListPropertyModal} setSelectedRental={setSelectedRental} setRentalApplicationModal={setRentalApplicationModal} setMockRentalApplied={setMockRentalApplied} />;
      case 'sales': return <SalesMarketplaceComponent currentUser={currentUser} propertiesForSale={propertiesForSale} setListPropertyForSaleModal={setListPropertyForSaleModal} setSelectedSaleProperty={setSelectedSaleProperty} setSalesApplicationModal={setSalesApplicationModal} />;
      case 'messages': return <MessagesSectionComponent currentUser={currentUser} conversations={conversations} selectedConversationId={selectedConversationId} setSelectedConversationId={setSelectedConversationId} newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} getOtherParticipant={getOtherParticipant} usersDB={usersDB} />;
      case 'profile': return <ProfileSectionComponent currentUser={currentUser} setCurrentUser={setCurrentUser} usersDB={usersDB} setUsersDB={setUsersDB} addNotification={addNotification} profilePictureInputRef={profilePictureInputRef} />;
      default: return <DashboardComponent currentUser={currentUser} myLoans={myLoans} rentalProperties={rentalProperties} propertiesForSale={propertiesForSale} setActiveTab={setActiveTab} showBalance={showBalance} setShowBalance={setShowBalance} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {/* Sidebar (Desktop) */}
      <aside className="w-60 bg-white p-5 border-r border-gray-200 flex-col justify-between shadow-sm hidden md:flex">
        <div>
          <div className="flex items-center space-x-2.5 mb-8 px-1">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center"><DollarSign className="w-5 h-5 text-white" /></div>
            <h1 className="text-lg font-bold text-gray-900">Cash Whale</h1>
          </div>
          <nav className="space-y-1.5">
            {MAIN_NAV_ITEMS.map(item => (
              <NavItem key={item.tabName} {...item} isActive={activeTab === item.tabName} onClick={() => setActiveTab(item.tabName as ActiveTab)} />
            ))}
          </nav>
        </div>
        <div>
          {currentUser && (
            <div className="mb-4 p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2.5">
                {currentUser.profileImageUrl ? <img src={currentUser.profileImageUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold text-xs">{currentUser.avatar}</div>}
                <div><p className="font-semibold text-xs text-gray-800 leading-tight">{`${currentUser.firstName} ${currentUser.lastName}`}</p><p className="text-xs text-gray-500 leading-tight">{currentUser.email}</p></div>
              </div>
            </div>
          )}
          <button onClick={logout} className="flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors group">
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" /><span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center md:justify-end relative z-40">
          <div className="flex items-center space-x-2.5 md:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><DollarSign className="w-4 h-4 text-white" /></div>
            <h1 className="text-md font-bold text-gray-900">Cash Whale</h1>
          </div>
          <div className="relative">
            <button onClick={() => setShowNotificationPanel(prev => !prev)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications.filter(n => n.timestamp > new Date(Date.now() - 5*60*1000)).length > 0 && ( // Show count for recent notifications
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.filter(n => n.timestamp > new Date(Date.now() - 5*60*1000)).length}
                </span>
              )}
            </button>
            <NotificationPanelComponent notifications={notifications} setNotifications={setNotifications} showNotificationPanel={showNotificationPanel} />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-20 md:pb-8">
          {renderContent()}
        </main>
      </div>

      {/* Modals */}
      {loanApplicationModal && <LoanApplicationModalComponent currentUser={currentUser} setLoanApplicationModal={setLoanApplicationModal} submitLoanApplication={submitLoanApplication} addNotification={addNotification} calculateReferenceInterestRate={calculateReferenceInterestRate} />}
      {lendingModal && selectedLoanForLending && <LendingModalComponent currentUser={currentUser} selectedLoanForLending={selectedLoanForLending} lendingStep={lendingStep} setLendingStep={setLendingStep} finalizeLending={finalizeLending} addNotification={addNotification} setLendingModal={setLendingModal} setSelectedLoanForLending={setSelectedLoanForLending} setCurrentUser={setCurrentUser} />}
      {rentalApplicationModal && selectedRental && <RentalApplicationModalComponent currentUser={currentUser} selectedRental={selectedRental} setRentalApplicationModal={setRentalApplicationModal} mockRentalApplied={mockRentalApplied} setMockRentalApplied={setMockRentalApplied} handleGenerateContract={handleGenerateContract} isGeneratingContract={isGeneratingContract} addNotification={addNotification} />}
      {listPropertyModal && <ListPropertyModalComponent currentUser={currentUser} setListPropertyModal={setListPropertyModal} handleListProperty={handleListProperty} addNotification={addNotification} />}
      {listPropertyForSaleModal && <ListPropertyForSaleModalComponent currentUser={currentUser} setListPropertyForSaleModal={setListPropertyForSaleModal} handleListPropertyForSale={handleListPropertyForSale} addNotification={addNotification} />}
      {showContractModal && <ContractDisplayModalComponent generatedContractText={generatedContractText} contractTypeForModal={contractTypeForModal} setShowContractModal={setShowContractModal} downloadContractText={downloadContractText} />}
      {showAIInsightModal && selectedLoanForInsight && <AIInsightModalComponent selectedLoanForInsight={selectedLoanForInsight} aiInsightText={aiInsightText} isFetchingAIInsight={isFetchingAIInsight} setShowAIInsightModal={setShowAIInsightModal} />}
      
      {/* Sales Property Modal (Simplified Detail View) */}
      {salesApplicationModal && selectedSaleProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[70] font-inter">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedSaleProperty.title}</h2>
              <button type="button" onClick={() => setSalesApplicationModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            <img src={selectedSaleProperty.imageUrls[0] || `https://picsum.photos/600/400?text=${encodeURIComponent(selectedSaleProperty.title)}`} alt={selectedSaleProperty.title} className="w-full h-64 object-cover rounded-lg mb-4"/>
            <p className="text-sm text-gray-500 mb-2"><MapPin className="w-4 h-4 inline mr-1"/>{selectedSaleProperty.streetAddress}, {selectedSaleProperty.city}, {selectedSaleProperty.province} {selectedSaleProperty.postalCode}</p>
            <div className="flex items-center justify-between text-lg mb-3">
              <span className="font-bold text-green-600">${selectedSaleProperty.price.toLocaleString()}</span>
              <div className="flex space-x-4 text-gray-700">
                <span className="flex items-center"><BedDouble className="w-5 h-5 mr-1 text-blue-500"/> {selectedSaleProperty.bedrooms === 0 ? 'Studio/Land' : selectedSaleProperty.bedrooms}</span>
                <span className="flex items-center"><Bath className="w-5 h-5 mr-1 text-blue-500"/> {selectedSaleProperty.bathrooms}</span>
                <span className="flex items-center"><Maximize className="w-5 h-5 mr-1 text-blue-500"/> {selectedSaleProperty.squareMeterage} sqm</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">{selectedSaleProperty.description}</p>
            <p className="text-xs text-gray-500 mb-4">Property Type: {selectedSaleProperty.propertyType}</p>
            <p className="text-xs text-gray-500 mb-4">Listed by: {selectedSaleProperty.sellerName}</p>
            <button onClick={() => { if(currentUser && selectedSaleProperty.sellerId !== currentUser.id) startOrSelectConversation(selectedSaleProperty.sellerId, selectedSaleProperty.sellerName); else addNotification("This is your listing or cannot message seller.", "info");}} className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition font-semibold">Contact Seller</button>
          </div>
        </div>
      )}


      {/* Global notifications pop-up */}
      <div className="fixed top-20 right-5 z-[100] w-full max-w-xs sm:max-w-sm space-y-3">
        {notifications.slice(0, 1).map(n => ( // Show only the latest one as a toast
          <div key={`popup-${n.id}`} className={`p-3 sm:p-4 rounded-lg shadow-xl border-l-4 flex items-start space-x-2 sm:space-x-3 ${n.type === 'success' ? 'bg-green-100 border-green-500 text-green-800' : n.type === 'error' ? 'bg-red-100 border-red-500 text-red-800' : 'bg-blue-100 border-blue-500 text-blue-800'}`}>
            {n.type === 'success' ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0" /> : n.type === 'error' ? <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0" /> : <Bell className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0" />}
            <p className="text-xs sm:text-sm flex-1">{n.message}</p>
            <button onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))} className="text-current opacity-70 hover:opacity-100 shrink-0 ml-auto"><X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
          </div>
        ))}
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-1.5 flex justify-around shadow-top-md z-40">
        {MOBILE_NAV_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <button key={item.tabName} onClick={() => setActiveTab(item.tabName as ActiveTab)} className={`flex flex-col items-center justify-center p-1.5 rounded-md w-1/5 transition-colors ${activeTab === item.tabName ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}>
              <Icon className="w-5 h-5 mb-0.5" /><span className="text-xxs font-medium" style={{ fontSize: '0.65rem', lineHeight: '0.8rem' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Due to the "handful of files" and "single XML block" constraints, complex component definitions
// from the user's original code are adapted and would be placed here, outside the App component body.
// This is a simplified representation; actual components are substantial.

// --- Dashboard Component ---
const DashboardComponent: React.FC<{currentUser: User; myLoans: MyLoan[]; rentalProperties: RentalProperty[]; propertiesForSale: SaleProperty[]; setActiveTab: (tab: ActiveTab) => void; showBalance: boolean; setShowBalance: (show: boolean) => void;}> = ({ currentUser, myLoans, rentalProperties, propertiesForSale, setActiveTab, showBalance, setShowBalance }) => {
  const userLentLoansCount = myLoans.filter(loan => loan.type === 'lent' && loan.lenderId === currentUser.id && loan.status === 'active').length;
  const userBorrowedLoansCount = myLoans.filter(loan => loan.type === 'borrowed' && loan.borrowerId === currentUser.id && loan.status === 'active').length;
  const userRentalListingsCount = rentalProperties.filter(p => p.landlordId === currentUser.id && p.status === 'available').length;
  const userSaleListingsCount = propertiesForSale.filter(p => p.sellerId === currentUser.id && p.status === 'available').length;

  return ( <div className="space-y-6 lg:space-y-8"> <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center"> <div> <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, {currentUser.firstName}!</h1> <p className="text-gray-600 mt-1">Here's your financial overview today.</p> </div> </div> 
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg"> <div className="flex justify-between items-start"> <div> <div className="flex items-center space-x-2 mb-1.5"> <span className="text-sm text-blue-100">Available Balance</span> <button onClick={() => setShowBalance(!showBalance)} className="text-blue-100 hover:text-white">{showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button> </div> <div className="text-3xl lg:text-4xl font-bold">${showBalance ? currentUser.balance.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : '•••••••'}</div> <div className="flex items-center space-x-4 mt-3 text-xs text-blue-100"> <div className="flex items-center space-x-1"><Star className="w-3.5 h-3.5 text-yellow-300" /><span>{currentUser.rating} Rating</span></div> <span>Credit Score: {currentUser.creditScore}</span> </div> </div> </div> </div> 
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userLentLoansCount > 0 && ( <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"> <div className="flex items-center space-x-3 mb-2"> <TrendingUp className="w-6 h-6 text-green-500"/> <h2 className="text-lg font-semibold text-gray-800">My Lending Summary</h2> </div> <p className="text-sm text-gray-600">You have <span className="font-bold text-green-600">{userLentLoansCount}</span> active loan(s) you've funded.</p> <button onClick={() => setActiveTab('myLoans')} className="text-sm text-blue-600 hover:underline mt-3 font-medium">View My Investments</button> </div> )}
        {userBorrowedLoansCount > 0 && ( <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"> <div className="flex items-center space-x-3 mb-2"> <DollarSignIcon className="w-6 h-6 text-red-500"/> <h2 className="text-lg font-semibold text-gray-800">My Borrowing Summary</h2> </div> <p className="text-sm text-gray-600">You have <span className="font-bold text-red-600">{userBorrowedLoansCount}</span> active loan(s) you're repaying.</p> <button onClick={() => setActiveTab('myLoans')} className="text-sm text-blue-600 hover:underline mt-3 font-medium">View My Loans</button> </div> )}
         {userRentalListingsCount > 0 && ( <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"> <div className="flex items-center space-x-3 mb-2"> <HomeIcon className="w-6 h-6 text-indigo-500"/> <h2 className="text-lg font-semibold text-gray-800">My Rental Listings</h2> </div> <p className="text-sm text-gray-600">You have <span className="font-bold text-indigo-600">{userRentalListingsCount}</span> active rental listing(s).</p> <button onClick={() => setActiveTab('rentals')} className="text-sm text-blue-600 hover:underline mt-3 font-medium">Manage Rentals</button> </div> )}
        {userSaleListingsCount > 0 && ( <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"> <div className="flex items-center space-x-3 mb-2"> <Tag className="w-6 h-6 text-orange-500"/> <h2 className="text-lg font-semibold text-gray-800">My Properties For Sale</h2> </div> <p className="text-sm text-gray-600">You have <span className="font-bold text-orange-600">{userSaleListingsCount}</span> properties listed for sale.</p> <button onClick={() => setActiveTab('sales')} className="text-sm text-blue-600 hover:underline mt-3 font-medium">Manage Sales Listings</button> </div> )}
        {(userLentLoansCount === 0 && userBorrowedLoansCount === 0 && userRentalListingsCount === 0 && userSaleListingsCount === 0) && ( <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center"> <ListChecks className="w-10 h-10 text-gray-400 mx-auto mb-3"/> <p className="text-gray-600 font-medium">No specific activity summaries to show yet.</p> <p className="text-sm text-gray-500">Explore lending, borrowing, or list a property to get started!</p> </div> )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"> <button onClick={() => setActiveTab('borrow')} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-left group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"> <div className="flex items-center space-x-3 mb-2"><div className="p-2.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors"><ArrowDownLeft className="w-5 h-5 text-green-600" /></div><span className="text-lg font-semibold text-gray-800">Request a Loan</span></div> <p className="text-sm text-gray-600">Get funds for your needs with competitive rates from peers.</p> </button> <button onClick={() => setActiveTab('lend')} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-left group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"> <div className="flex items-center space-x-3 mb-2"><div className="p-2.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"><ArrowUpRight className="w-5 h-5 text-blue-600" /></div><span className="text-lg font-semibold text-gray-800">Start Lending</span></div> <p className="text-sm text-gray-600">Earn returns by investing in verified loan requests.</p> </button> </div> 
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"> {[ { icon: ArrowUpRight, color: 'green', label: 'Total Lent', value: `$${currentUser.totalLent.toLocaleString()}` }, { icon: ArrowDownLeft, color: 'red', label: 'Total Borrowed', value: `$${currentUser.totalBorrowed.toLocaleString()}` }, { icon: Clock, color: 'blue', label: 'Active Loans', value: currentUser.activeLoans }, { icon: CheckCircle, color: 'purple', label: 'Completed', value: currentUser.completedTransactions }, ].map(item => { const ItemIcon = item.icon; return ( <div key={item.label} className="bg-white p-4 rounded-xl border border-gray-200"> <div className="flex items-center space-x-3"> <div className={`p-2 bg-${item.color}-100 rounded-lg`}><ItemIcon className={`w-5 h-5 text-${item.color}-600`} /></div> <div> <div className="text-xs text-gray-500">{item.label}</div> <div className="text-md font-semibold text-gray-800">{item.value}</div> </div> </div> </div> ); })} </div> 
    </div> );
};

// --- LendMarketplace Component ---
const LendMarketplaceComponent: React.FC<{currentUser: User; loanOpportunities: LoanOpportunity[]; setSelectedLoanForLending: (loan: LoanOpportunity | null) => void; setLendingModal: (show: boolean) => void; setLendingStep: (step: string) => void; handleFetchAIInsights: (loan: LoanOpportunity) => void; startOrSelectConversation: (userId: number, userName: string) => void;}> = ({ currentUser, loanOpportunities, setSelectedLoanForLending, setLendingModal, setLendingStep, handleFetchAIInsights, startOrSelectConversation }) => {
  const initialFilters = { purpose: 'all', duration: 'all', minRate: '', creditScoreRange: 'all' }; const [searchTerm, setSearchTerm] = useState(''); const [filters, setFilters] = useState(initialFilters); const handleClearFilters = () => { setSearchTerm(''); setFilters(initialFilters); }; const filteredLoans = loanOpportunities .filter(loan => loan.borrowerId !== currentUser?.id) .filter(loan => loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) || loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ) .filter(loan => filters.purpose === 'all' || loan.purpose.startsWith(filters.purpose)) .filter(loan => filters.duration === 'all' || loan.duration <= parseInt(filters.duration)) .filter(loan => filters.minRate === '' || loan.proposedInterestRate >= parseFloat(filters.minRate)) .filter(loan => { if (filters.creditScoreRange === 'all') return true; const [min, max] = filters.creditScoreRange.split('-').map(Number); if (max) return loan.creditScore >= min && loan.creditScore <= max; return loan.creditScore >= min; }); 
  const handleOpenLendModal = (loan: LoanOpportunity) => { setSelectedLoanForLending(loan); setLendingModal(true); setLendingStep('amountEntry');};
  
  return ( <div className="space-y-6"> <div><h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lending Marketplace</h1><p className="text-gray-600 mt-1">Find opportunities to invest and earn returns.</p></div> <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm"> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end"> <div className="sm:col-span-2 xl:col-span-2"> <label className="block text-xs font-medium text-gray-500 mb-1">Search</label> <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="w-4 h-4 text-gray-400" /></div> <input type="text" placeholder="Borrower, purpose..." className={`${MODAL_INPUT_STYLE} pl-9 h-[38px]`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div> </div> <div> <label className="block text-xs font-medium text-gray-500 mb-1">Purpose</label> <select value={filters.purpose} onChange={(e) => setFilters({...filters, purpose: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}> <option value="all">All Purposes</option> {LOAN_PURPOSE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}</select> </div> <div> <label className="block text-xs font-medium text-gray-500 mb-1">Credit Score</label> <select value={filters.creditScoreRange} onChange={(e) => setFilters({...filters, creditScoreRange: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}> <option value="all">Any Score</option> <option value="750-900">Excellent (750+)</option> <option value="700-749">Good (700-749)</option> <option value="650-699">Fair (650-699)</option> <option value="0-649">Needs Improvement (&lt;650)</option></select> </div> <button onClick={handleClearFilters} className="flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors h-[38px]"> <RotateCcw className="w-4 h-4" /><span>Clear</span></button> </div> </div> {filteredLoans.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {filteredLoans.map(loan => { const PurposeIcon = loan.purposeIcon || ShoppingCart; const canLend = currentUser && currentUser.balance > 0 && loan.funded < 100; return ( <div key={loan.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all hover:shadow-xl"> <div className="p-5 flex-grow"> <div className="flex items-start justify-between mb-3"> <div className="flex items-center"><div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold mr-3 text-sm">{loan.avatar}</div> <div><h3 className="font-semibold text-md text-gray-900 leading-tight">{loan.borrowerName}</h3><div className="flex items-center text-xs text-gray-500 mt-0.5">Score: <strong className="text-blue-600 ml-1">{loan.creditScore}</strong></div></div> </div> <div className="flex items-center space-x-2"> <button onClick={() => handleFetchAIInsights(loan)} className="p-1.5 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors text-xs" title="AI Insights"> <Lightbulb className="w-3.5 h-3.5"/> </button> <button onClick={() => startOrSelectConversation(loan.borrowerId, loan.borrowerName)} className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors text-xs" title="Contact Borrower"> <MessageCircleIcon className="w-3.5 h-3.5"/> </button></div></div> <div className="flex items-center text-xs text-gray-600 mb-2 px-5"><PurposeIcon className="w-3.5 h-3.5 mr-1.5 text-blue-600" /><span>{loan.purpose}</span></div> <div className="mb-3 px-5"> <div className="flex justify-between items-center text-xs mb-0.5"><span className="text-gray-500">Funded</span><span className="font-semibold text-blue-600">{loan.funded.toFixed(0)}%</span></div> <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: `${loan.funded}%` }}></div></div> </div> <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3 px-5"> <div><div className="font-semibold text-gray-800">${loan.amount.toLocaleString()}</div><div className="text-xs text-gray-500">Amount</div></div> <div><div className="font-semibold text-green-600">{loan.proposedInterestRate}%</div><div className="text-xs text-gray-500">Rate (APR)</div></div> <div><div className="font-semibold text-gray-800">{loan.duration}m</div><div className="text-xs text-gray-500">Duration</div></div> </div><div className="text-xs text-gray-400 text-right px-5 pb-3">{loan.funders} funders · {loan.timePosted}</div> </div> <button onClick={() => handleOpenLendModal(loan)} disabled={!canLend} className="w-full bg-blue-600 text-white py-2.5 font-medium text-sm hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"> {loan.funded >= 100 ? 'Fully Funded' : (currentUser && (currentUser.balance / 1.01) > 0 ? 'Lend Now' : 'Insufficient Balance')} </button> </div>);})} </div> ) : ( <div className="text-center py-12 bg-white rounded-xl border border-gray-200"><Search className="w-12 h-12 text-gray-300 mx-auto mb-4" /><p className="text-gray-600 font-medium">No loan opportunities match your criteria.</p><p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters, or check back later.</p></div>)} </div>);
};

// --- BorrowSection Component ---
const BorrowSectionComponent: React.FC<{currentUser: User; loanOpportunities: LoanOpportunity[]; setLoanApplicationModal: (show: boolean) => void; cancelLoanRequest: (loanId: string | number) => void;}> = ({currentUser, loanOpportunities, setLoanApplicationModal, cancelLoanRequest}) => {
  if (!currentUser) return null; const userLoanRequests = loanOpportunities.filter(loan => loan.borrowerId === currentUser.id).sort((a,b) => (b.timePosted === "Just now" ? 1 : (a.timePosted === "Just now" ? -1 : 0)));
  return ( <div className="space-y-6"> <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div><h1 className="text-2xl md:text-3xl font-bold text-gray-900">Borrow Funds</h1><p className="text-gray-600 mt-1">Apply for a loan to meet your financial goals.</p></div> <button onClick={() => setLoanApplicationModal(true)} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition shadow-sm font-medium"><Plus className="w-5 h-5" /><span>Apply for New Loan</span></button> </div> <div> <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Loan Requests</h2> {userLoanRequests.length > 0 ? ( <div className="space-y-4"> {userLoanRequests.map(loan => { const PurposeIcon = loan.purposeIcon || ShoppingCart; return ( <div key={loan.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"> <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-3"> <div className="flex items-center mb-2 sm:mb-0"><PurposeIcon className="w-5 h-5 text-blue-600 mr-2.5"/><h3 className="text-md font-semibold text-gray-800">{loan.purpose}</h3></div> <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ loan.funded >= 100 ? 'bg-green-100 text-green-700' : loan.funded > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700' }`}> {loan.funded >= 100 ? 'Fully Funded' : `Funded: ${loan.funded.toFixed(0)}%`} </span> </div> <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3"> <div><div className="text-gray-500">Amount</div><div className="font-semibold text-gray-700">${loan.amount.toLocaleString()}</div></div> <div><div className="text-gray-500">Proposed Rate</div><div className="font-semibold text-gray-700">{loan.proposedInterestRate}%</div></div> <div><div className="text-gray-500">Duration</div><div className="font-semibold text-gray-700">{loan.duration}m</div></div> <div><div className="text-gray-500">Funders</div><div className="font-semibold text-gray-700">{loan.funders}</div></div> </div> <div className="w-full bg-gray-200 rounded-full h-2 mb-1"><div className="bg-blue-600 h-2 rounded-full" style={{ width: `${loan.funded}%` }}></div></div> <div className="flex justify-between items-center mt-2"> <p className="text-xs text-gray-400">Posted: {loan.timePosted}</p> {loan.funded < 100 && ( <button onClick={() => cancelLoanRequest(loan.id)} className="flex items-center space-x-1.5 text-xs bg-red-100 text-red-700 hover:bg-red-200 px-2.5 py-1 rounded-md"> <Trash2 className="w-3 h-3"/> <span>Cancel Request</span> </button> )} </div> </div> )})} </div> ) : ( <div className="text-center py-10 bg-white rounded-xl border border-gray-200"><FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" /><p className="text-gray-600">You haven't posted any loan requests yet.</p><button onClick={() => setLoanApplicationModal(true)} className="mt-3 text-blue-600 font-medium hover:underline text-sm">Apply for your first loan</button></div>)} </div> </div> );
};

// --- MyLoansSection Component ---
const MyLoansSectionComponent: React.FC<{currentUser: User; myLoans: MyLoan[]; setMyLoans: React.Dispatch<React.SetStateAction<MyLoan[]>>; setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>; addNotification: (message: string, type?: NotificationMessage['type']) => void; handleGenerateContract: (type: ContractType, data: ContractData) => void; isGeneratingContract: boolean; contractDataForModal: ContractData | null; setActiveTab: (tab: ActiveTab) => void; }> = ({ currentUser, myLoans, setMyLoans, setCurrentUser, addNotification, handleGenerateContract, isGeneratingContract, contractDataForModal, setActiveTab }) => {
  const loansLent = myLoans.filter(loan => loan.type === 'lent' && loan.lenderId === currentUser.id); const loansBorrowed = myLoans.filter(loan => loan.type === 'borrowed' && loan.borrowerId === currentUser.id); 
  const handleMakePayment = (loanId: string) => { const loanToPay = myLoans.find(l => l.id === loanId && l.type === 'borrowed'); if (!loanToPay || loanToPay.status !== 'active' || !loanToPay.monthlyPayment) { addNotification("Cannot make payment on this loan.", "error"); return; } if (currentUser.balance < loanToPay.monthlyPayment) { addNotification("Insufficient balance to make payment.", "error"); return; } let loanPaidOff = false; const updatedMyLoans = myLoans.map(l => { if (l.id === loanId && l.monthlyPayment) { const newRemainingMonths = l.remainingMonths - 1; const newTotalPaid = (l.totalPaid || 0) + l.monthlyPayment; let newStatus: MyLoan['status'] = l.status; if (newRemainingMonths <= 0) { newStatus = "paid"; loanPaidOff = true; } return { ...l, remainingMonths: newRemainingMonths, totalPaid: newTotalPaid, status: newStatus }; } return l; }); setMyLoans(updatedMyLoans); setCurrentUser(prevUser => { if(!prevUser || !loanToPay.monthlyPayment) return prevUser; return ({ ...prevUser, balance: prevUser.balance - loanToPay.monthlyPayment, activeLoans: loanPaidOff ? Math.max(0, prevUser.activeLoans - 1) : prevUser.activeLoans, completedTransactions: loanPaidOff ? prevUser.completedTransactions + 1 : prevUser.completedTransactions }) }); if (loanPaidOff) { addNotification(`Loan from ${loanToPay.lenderName} of $${loanToPay.amount.toLocaleString()} has been fully paid off!`, "success"); } else { addNotification(`Payment of $${loanToPay.monthlyPayment.toFixed(2)} made for loan from ${loanToPay.lenderName}.`, "success"); } }; 
  const triggerLoanContractGeneration = (loan: MyLoan) => { const data: ContractData = { lenderName: loan.type === 'lent' ? `${currentUser.firstName} ${currentUser.lastName}` : loan.lenderName, lenderId: loan.type === 'lent' ? currentUser.id : loan.lenderId, borrowerName: loan.type === 'borrowed' ? `${currentUser.firstName} ${currentUser.lastName}` : loan.borrowerName, borrowerId: loan.type === 'borrowed' ? currentUser.id : loan.borrowerId, loanAmount: loan.amount, interestRate: loan.interestRate, durationMonths: loan.totalMonths, date: new Date().toLocaleDateString(), }; handleGenerateContract('loan', data); };
  
  const LoanCard: React.FC<{loan: MyLoan}> = ({ loan }) => { const progress = loan.totalMonths > 0 ? Math.min(100, ((loan.totalMonths - loan.remainingMonths) / loan.totalMonths) * 100) : 0; return ( <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"> <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-3"> <div> <h3 className="text-md font-semibold text-gray-800">{loan.type === 'lent' ? `Loan to ${loan.borrowerName}` : `Loan from ${loan.lenderName}`}</h3> <p className="text-xs text-gray-500">{loan.type === 'lent' ? `Est. Monthly Return: $${loan.monthlyReturn?.toFixed(2)}` : `Monthly Payment: $${loan.monthlyPayment?.toFixed(2)}`}</p> </div> <span className={`mt-1 sm:mt-0 text-xs px-2.5 py-1 rounded-full font-medium ${loan.status === 'active' ? 'bg-green-100 text-green-700' : loan.status === 'paid' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}> {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)} </span> </div> <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3"> <div><div className="text-gray-500">Amount</div><div className="font-semibold text-gray-700">${loan.amount.toLocaleString()}</div></div> <div><div className="text-gray-500">Rate (APR)</div><div className="font-semibold text-gray-700">{loan.interestRate}%</div></div> <div><div className="text-gray-500">Remaining</div><div className="font-semibold text-gray-700">{loan.remainingMonths > 0 ? `${loan.remainingMonths}/${loan.totalMonths}m` : 'Paid'}</div></div> <div><div className="text-gray-500">Next Payment</div><div className="font-semibold text-gray-700">{loan.status === 'active' ? loan.nextPayment : '-'}</div></div> </div> <div className="w-full bg-gray-200 rounded-full h-2 mb-0.5"><div className={`h-2 rounded-full ${loan.status === 'paid' ? 'bg-blue-500' : (loan.type === 'lent' ? 'bg-green-500' : 'bg-blue-500')}`} style={{ width: `${progress}%` }}></div></div> <p className="text-xs text-gray-400 text-right">{progress.toFixed(0)}% Completed</p> <div className="mt-3 flex gap-2"> {loan.type === 'borrowed' && loan.status === 'active' && ( <button onClick={() => handleMakePayment(loan.id)} className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition text-xs font-medium">Make Payment</button> )} <button onClick={() => triggerLoanContractGeneration(loan)} disabled={isGeneratingContract && contractDataForModal?.loanAmount === loan.amount} className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 transition text-xs font-medium flex items-center space-x-1 disabled:opacity-50"> <FileText className="w-3 h-3"/><span>{isGeneratingContract && contractDataForModal?.loanAmount === loan.amount ? 'Generating...':'📜 Agreement (Ref.)'}</span></button> </div> {loan.type === 'lent' && loan.status === 'active' && typeof loan.totalReturns === 'number' && loan.totalReturns > 0 && (<p className="mt-2 text-xs text-green-600">Total Returns to Date: ${loan.totalReturns.toFixed(2)}</p>)} {loan.type === 'borrowed' && typeof loan.totalPaid === 'number' && loan.totalPaid > 0 && (<p className="mt-2 text-xs text-blue-600">Total Paid to Date: ${loan.totalPaid.toFixed(2)}</p>)} </div>);};
  
  return ( <div className="space-y-8"> <div><h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">My Activity</h1><p className="text-gray-600 mt-1">Track your loans, investments, and rental activities.</p></div> <section> <div className="flex items-center mb-4"><ArrowUpRight className="w-5 h-5 text-green-600 mr-2" /><h2 className="text-xl font-semibold text-gray-800">Investments (Lent)</h2></div> {loansLent.length > 0 ? <div className="space-y-4">{loansLent.map(loan => <LoanCard key={loan.id} loan={loan} />)}</div> : ( <div className="text-center py-8 bg-white rounded-xl border border-gray-200"><TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-3" /><p className="text-gray-600">You haven't made any investments yet.</p><button onClick={() => setActiveTab('lend')} className="mt-3 text-blue-600 font-medium hover:underline text-sm">Explore Lending Opportunities</button></div>)} </section> <section> <div className="flex items-center mb-4"><ArrowDownLeft className="w-5 h-5 text-red-600 mr-2" /><h2 className="text-xl font-semibold text-gray-800">My Borrowed Loans</h2></div> {loansBorrowed.length > 0 ? <div className="space-y-4">{loansBorrowed.map(loan => <LoanCard key={loan.id} loan={loan} />)}</div> : ( <div className="text-center py-8 bg-white rounded-xl border border-gray-200"><DollarSign className="w-10 h-10 text-gray-300 mx-auto mb-3" /><p className="text-gray-600">You don't have any active borrowed loans.</p><button onClick={() => setActiveTab('borrow')} className="mt-3 text-blue-600 font-medium hover:underline text-sm">Need Funds? Apply for a Loan</button></div>)} </section> </div>);
};

// --- RentalMarketplace Component ---
const RentalMarketplaceComponent: React.FC<{currentUser: User; rentalProperties: RentalProperty[]; setListPropertyModal: (show: boolean) => void; setSelectedRental: (property: RentalProperty | null) => void; setRentalApplicationModal: (show: boolean) => void; setMockRentalApplied: (applied: boolean) => void;}> = ({ currentUser, rentalProperties, setListPropertyModal, setSelectedRental, setRentalApplicationModal, setMockRentalApplied }) => {
  const initialFilters = { city: 'all', bedrooms: 'all', minRent: '', maxRent: '', amenities: '', sortBy: 'newest' }; const [searchTerm, setSearchTerm] = useState(''); const [filters, setFilters] = useState(initialFilters); const handleClearFilters = () => { setSearchTerm(''); setFilters(initialFilters); }; const filteredAndSortedRentals = rentalProperties .filter(property => property.status === 'available') .filter(property => property.title.toLowerCase().includes(searchTerm.toLowerCase()) || property.streetAddress.toLowerCase().includes(searchTerm.toLowerCase()) || property.city.toLowerCase().includes(searchTerm.toLowerCase()) || property.description.toLowerCase().includes(searchTerm.toLowerCase()) ) .filter(property => filters.city === 'all' || property.city === filters.city) .filter(property => filters.bedrooms === 'all' || property.bedrooms >= parseInt(filters.bedrooms)) .filter(property => filters.minRent === '' || property.rentAmount >= parseFloat(filters.minRent)) .filter(property => filters.maxRent === '' || property.rentAmount <= parseFloat(filters.maxRent)) .filter(property => { if (filters.amenities === '') return true; const requiredAmenities = filters.amenities.toLowerCase().split(',').map(a => a.trim()).filter(a => a); return requiredAmenities.every(reqAmenity => property.amenities.some(propAmenity => propAmenity.toLowerCase().includes(reqAmenity)) ); }) .sort((a, b) => { switch (filters.sortBy) { case 'rent_asc': return a.rentAmount - b.rentAmount; case 'rent_desc': return b.rentAmount - a.rentAmount; case 'sqft_desc': return b.squareMeterage - a.squareMeterage; case 'newest': default: return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime(); } }); const uniqueCities = [...new Set(rentalProperties.map(p => p.city))].sort();
  return ( <div className="space-y-6"> <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div><h1 className="text-2xl md:text-3xl font-bold text-gray-900">Rental Marketplace</h1><p className="text-gray-600 mt-1">Find your next home or list your property.</p></div> <button onClick={() => setListPropertyModal(true)} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition shadow-sm font-medium text-sm"> <Briefcase className="w-4 h-4" /><span>List Your Property</span> </button> </div> <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm"> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-end"> <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1"> <label className="block text-xs font-medium text-gray-500 mb-1">Search Location/Title</label> <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="w-4 h-4 text-gray-400" /></div> <input type="text" placeholder="e.g., Downtown, San Francisco" className={`${MODAL_INPUT_STYLE} pl-9 h-[38px]`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div> </div> <div> <label className="block text-xs font-medium text-gray-500 mb-1">City</label> <select value={filters.city} onChange={(e) => setFilters({...filters, city: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}> <option value="all">All Cities</option> {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}</select> </div> <div> <label className="block text-xs font-medium text-gray-500 mb-1">Bedrooms</label> <select value={filters.bedrooms} onChange={(e) => setFilters({...filters, bedrooms: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}> <option value="all">Any</option> <option value="0">Studio</option> <option value="1">1+</option> <option value="2">2+</option> <option value="3">3+</option> <option value="4">4+</option></select> </div> <div className="grid grid-cols-2 gap-2"> <div><label className="block text-xs font-medium text-gray-500 mb-1">Min Rent</label><input type="number" placeholder="$" value={filters.minRent} onChange={e => setFilters({...filters, minRent: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}/></div> <div><label className="block text-xs font-medium text-gray-500 mb-1">Max Rent</label><input type="number" placeholder="$" value={filters.maxRent} onChange={e => setFilters({...filters, maxRent: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}/></div> </div> <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2"> <label className="block text-xs font-medium text-gray-500 mb-1">Amenities (comma-separated)</label> <input type="text" placeholder="e.g., Parking, Gym" value={filters.amenities} onChange={e => setFilters({...filters, amenities: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}/> </div> <div> <label className="block text-xs font-medium text-gray-500 mb-1">Sort By</label> <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}> <option value="newest">Newest Listed</option> <option value="rent_asc">Rent (Low to High)</option> <option value="rent_desc">Rent (High to Low)</option> <option value="sqft_desc">Size (Largest First)</option> </select> </div> <button onClick={handleClearFilters} className="flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors h-[38px] w-full xl:w-auto xl:col-start-4"> <RotateCcw className="w-4 h-4" /><span>Clear</span></button> </div> </div> {filteredAndSortedRentals.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"> {filteredAndSortedRentals.map(property => ( <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all hover:shadow-lg"> <img src={property.imageUrls[0] || `https://picsum.photos/600/400?text=${encodeURIComponent(property.title)}`} alt={property.title} className="w-full h-44 object-cover"/> <div className="p-4 flex-grow flex flex-col"> <h3 className="font-semibold text-md text-gray-800 mb-1 line-clamp-1">{property.title}</h3> <div className="flex justify-between items-center text-xs text-gray-500 mb-2"> <span className="flex items-center truncate"><MapPin className="w-3 h-3 mr-1 shrink-0"/>{property.city}, {property.province}</span> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.streetAddress + ', ' + property.city + ', ' + property.province)}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-600 hover:underline shrink-0 ml-2"> <ExternalLink className="w-3 h-3 mr-0.5"/> Map </a> </div> <p className="text-xs text-gray-600 mb-2 flex-grow line-clamp-2 h-10">{property.description}</p> <div className="flex items-center justify-between text-xs mb-2 text-gray-600"> <span className="flex items-center"><BedDouble className="w-3.5 h-3.5 mr-1 text-blue-500"/> {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bed${property.bedrooms > 1 ? 's':''}`}</span> <span className="flex items-center"><Bath className="w-3.5 h-3.5 mr-1 text-blue-500"/> {property.bathrooms} Bath{property.bathrooms > 1 ? 's':''}</span> <span className="flex items-center"><Maximize className="w-3.5 h-3.5 mr-1 text-blue-500"/> {property.squareMeterage} sqm</span> </div> <div className="text-lg font-bold text-blue-600 mb-2">${property.rentAmount.toLocaleString()}<span className="text-xs font-normal text-gray-500">/month</span></div> {property.imageUrls.length > 1 && <p className="text-xxs text-gray-400 text-right -mt-1 mb-1 flex items-center justify-end"><ImageIcon size={12} className="mr-1"/>{property.imageUrls.length} photos</p>} </div> <button onClick={() => { setSelectedRental(property); setRentalApplicationModal(true); setMockRentalApplied(false);}} className="w-full bg-blue-500 text-white py-2 font-medium text-sm hover:bg-blue-600 transition">View & Apply</button> </div> ))} </div> ) : ( <div className="text-center py-12 bg-white rounded-xl border border-gray-200"><HomeModernIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" /><p className="text-gray-600 font-medium">No rental properties match your criteria.</p><p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p></div>)} </div> );
};

// --- SalesMarketplace Component (New) ---
const SalesMarketplaceComponent: React.FC<{currentUser: User; propertiesForSale: SaleProperty[]; setListPropertyForSaleModal: (show: boolean) => void; setSelectedSaleProperty: (property: SaleProperty | null) => void; setSalesApplicationModal: (show: boolean) => void;}> = ({ currentUser, propertiesForSale, setListPropertyForSaleModal, setSelectedSaleProperty, setSalesApplicationModal }) => {
  const initialFilters = { city: 'all', bedrooms: 'all', minPrice: '', maxPrice: '', propertyType: 'all', sortBy: 'newest' }; const [searchTerm, setSearchTerm] = useState(''); const [filters, setFilters] = useState(initialFilters); const handleClearFilters = () => { setSearchTerm(''); setFilters(initialFilters); }; 
  const filteredAndSortedSales = propertiesForSale
    .filter(property => property.status === 'available')
    .filter(property => property.title.toLowerCase().includes(searchTerm.toLowerCase()) || property.streetAddress.toLowerCase().includes(searchTerm.toLowerCase()) || property.city.toLowerCase().includes(searchTerm.toLowerCase()) || property.description.toLowerCase().includes(searchTerm.toLowerCase()) )
    .filter(property => filters.city === 'all' || property.city === filters.city)
    .filter(property => filters.bedrooms === 'all' || property.bedrooms >= parseInt(filters.bedrooms))
    .filter(property => filters.minPrice === '' || property.price >= parseFloat(filters.minPrice))
    .filter(property => filters.maxPrice === '' || property.price <= parseFloat(filters.maxPrice))
    .filter(property => filters.propertyType === 'all' || property.propertyType === filters.propertyType)
    .sort((a, b) => { switch (filters.sortBy) { case 'price_asc': return a.price - b.price; case 'price_desc': return b.price - a.price; case 'sqft_desc': return b.squareMeterage - a.squareMeterage; case 'newest': default: return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime(); } });
  const uniqueCities = [...new Set(propertiesForSale.map(p => p.city))].sort();
  const uniquePropertyTypes = [...new Set(propertiesForSale.map(p => p.propertyType))].sort();

  return ( <div className="space-y-6"> <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div><h1 className="text-2xl md:text-3xl font-bold text-gray-900">Properties For Sale</h1><p className="text-gray-600 mt-1">Find your dream property or list yours for sale.</p></div> <button onClick={() => setListPropertyForSaleModal(true)} className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2.5 rounded-lg hover:bg-orange-600 transition shadow-sm font-medium text-sm"> <Tag className="w-4 h-4" /><span>List Property For Sale</span> </button> </div>
  <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm"> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-end"> 
  <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1"> <label className="block text-xs font-medium text-gray-500 mb-1">Search Location/Title</label> <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="w-4 h-4 text-gray-400" /></div> <input type="text" placeholder="e.g., Victorian, Austin" className={`${MODAL_INPUT_STYLE} pl-9 h-[38px]`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div> </div> 
  <div> <label className="block text-xs font-medium text-gray-500 mb-1">City</label> <select value={filters.city} onChange={(e) => setFilters({...filters, city: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}> <option value="all">All Cities</option> {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}</select> </div> 
  <div> <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label> <select value={filters.propertyType} onChange={(e) => setFilters({...filters, propertyType: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}> <option value="all">All Types</option> {uniquePropertyTypes.map(type => <option key={type} value={type}>{type}</option>)}</select> </div> 
  <div className="grid grid-cols-2 gap-2"> <div><label className="block text-xs font-medium text-gray-500 mb-1">Min Price</label><input type="number" placeholder="$" value={filters.minPrice} onChange={e => setFilters({...filters, minPrice: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}/></div> <div><label className="block text-xs font-medium text-gray-500 mb-1">Max Price</label><input type="number" placeholder="$" value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}/></div> </div> 
  <div> <label className="block text-xs font-medium text-gray-500 mb-1">Bedrooms</label> <select value={filters.bedrooms} onChange={(e) => setFilters({...filters, bedrooms: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}> <option value="all">Any</option> <option value="0">Studio/Land</option> <option value="1">1+</option> <option value="2">2+</option> <option value="3">3+</option> <option value="4">4+</option></select> </div> 
  <div> <label className="block text-xs font-medium text-gray-500 mb-1">Sort By</label> <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})} className={`${MODAL_INPUT_STYLE} h-[38px]`}> <option value="newest">Newest Listed</option> <option value="price_asc">Price (Low to High)</option> <option value="price_desc">Price (High to Low)</option> <option value="sqft_desc">Size (Largest First)</option> </select> </div> 
  <button onClick={handleClearFilters} className="flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors h-[38px] w-full xl:w-auto xl:col-start-4"> <RotateCcw className="w-4 h-4" /><span>Clear</span></button> </div> </div>
  {filteredAndSortedSales.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"> {filteredAndSortedSales.map(property => ( <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all hover:shadow-lg"> <img src={property.imageUrls[0] || `https://picsum.photos/600/400?text=${encodeURIComponent(property.title)}`} alt={property.title} className="w-full h-44 object-cover"/> <div className="p-4 flex-grow flex flex-col"> <h3 className="font-semibold text-md text-gray-800 mb-1 line-clamp-1">{property.title}</h3> <div className="flex justify-between items-center text-xs text-gray-500 mb-2"> <span className="flex items-center truncate"><MapPin className="w-3 h-3 mr-1 shrink-0"/>{property.city}, {property.province}</span> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.streetAddress + ', ' + property.city + ', ' + property.province)}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-600 hover:underline shrink-0 ml-2"> <ExternalLink className="w-3 h-3 mr-0.5"/> Map </a> </div> <p className="text-xs text-gray-600 mb-2 flex-grow line-clamp-2 h-10">{property.description}</p> <div className="flex items-center justify-between text-xs mb-2 text-gray-600"> <span className="flex items-center"><BedDouble className="w-3.5 h-3.5 mr-1 text-orange-500"/> {property.bedrooms === 0 ? 'Studio/Land' : `${property.bedrooms} Bed${property.bedrooms > 1 ? 's':''}`}</span> <span className="flex items-center"><Bath className="w-3.5 h-3.5 mr-1 text-orange-500"/> {property.bathrooms} Bath{property.bathrooms > 1 ? 's':''}</span> <span className="flex items-center"><Maximize className="w-3.5 h-3.5 mr-1 text-orange-500"/> {property.squareMeterage} sqm</span> </div> <div className="text-lg font-bold text-orange-600 mb-2">${property.price.toLocaleString()}<span className="text-xs font-normal text-gray-500"> ({property.propertyType})</span></div> {property.imageUrls.length > 1 && <p className="text-xxs text-gray-400 text-right -mt-1 mb-1 flex items-center justify-end"><ImageIcon size={12} className="mr-1"/>{property.imageUrls.length} photos</p>} </div> <button onClick={() => { setSelectedSaleProperty(property); setSalesApplicationModal(true); }} className="w-full bg-orange-500 text-white py-2 font-medium text-sm hover:bg-orange-600 transition">View Details</button> </div> ))} </div> ) : ( <div className="text-center py-12 bg-white rounded-xl border border-gray-200"><Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" /><p className="text-gray-600 font-medium">No properties for sale match your criteria.</p><p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p></div>)}
   </div>);
};

// --- MessagesSection Component (New) ---
const MessagesSectionComponent: React.FC<{currentUser: User; conversations: Conversation[]; selectedConversationId: string | null; setSelectedConversationId: (id: string | null) => void; newMessage: string; setNewMessage: (msg: string) => void; handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void; messagesEndRef: React.RefObject<HTMLDivElement>; getOtherParticipant: (conv: Conversation) => User | null; usersDB: User[];}> = ({ currentUser, conversations, selectedConversationId, setSelectedConversationId, newMessage, setNewMessage, handleSendMessage, messagesEndRef, getOtherParticipant, usersDB }) => {
  const selectedConv = conversations.find(c => c.id === selectedConversationId);
  return ( <div className="flex flex-col h-full"> <div className="p-4 border-b"> <h1 className="text-2xl font-bold text-gray-900">Messages</h1> </div> <div className="flex flex-1 overflow-hidden"> {/* Sidebar for conversations */} <div className="w-1/3 border-r overflow-y-auto"> {conversations.length === 0 && <p className="p-4 text-sm text-gray-500">No conversations yet. Start one from a loan or property!</p>} {conversations.map(conv => { const otherUser = getOtherParticipant(conv); const lastMessage = conv.messages[conv.messages.length -1]; return ( <button key={conv.id} onClick={() => setSelectedConversationId(conv.id)} className={`w-full text-left p-3 hover:bg-gray-100 border-b ${conv.id === selectedConversationId ? 'bg-blue-50' : ''}`}> <div className="flex items-center space-x-3"> <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold"> {otherUser?.avatar || '??'} </div> <div> <h3 className="font-semibold text-sm">{otherUser?.firstName} {otherUser?.lastName || 'Unknown User'}</h3> {lastMessage && <p className="text-xs text-gray-500 truncate">{lastMessage.text}</p>} </div> </div> </button> ); })} </div> {/* Chat area */} <div className="flex-1 flex flex-col"> {selectedConv ? ( <> <div className="p-4 border-b bg-gray-50"> <h2 className="font-semibold">{getOtherParticipant(selectedConv)?.firstName} {getOtherParticipant(selectedConv)?.lastName}</h2> </div> <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-100"> {selectedConv.messages.map(msg => ( <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}> <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-xl ${msg.senderId === currentUser.id ? 'bg-blue-500 text-white' : 'bg-white shadow-sm'}`}> <p className="text-sm">{msg.text}</p> <p className={`text-xxs mt-1 ${msg.senderId === currentUser.id ? 'text-blue-100' : 'text-gray-400'}`}> {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </p> </div> </div> ))} <div ref={messagesEndRef} /> </div> <form onSubmit={handleSendMessage} className="p-3 border-t bg-white flex items-center"> <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className={`${MODAL_INPUT_STYLE} flex-1 mr-2`} /> <button type="submit" className="p-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"> <Send className="w-5 h-5" /> </button> </form </> ) : ( <div className="flex-1 flex items-center justify-center text-gray-500"> Select a conversation to start chatting. </div> )} </div> </div> </div> );
};

// --- ProfileSection Component ---
const ProfileSectionComponent: React.FC<{currentUser: User; setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>; usersDB: User[]; setUsersDB: React.Dispatch<React.SetStateAction<User[]>>; addNotification: (message: string, type?: NotificationMessage['type']) => void; profilePictureInputRef: React.RefObject<HTMLInputElement>;}> = ({currentUser, setCurrentUser, usersDB, setUsersDB, addNotification, profilePictureInputRef}) => {
  const [profileData, setProfileData] = useState<User>(currentUser); const [isEditing, setIsEditing] = useState(false); 
  useEffect(() => { setProfileData(currentUser); }, [currentUser]); // Sync with global state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { const { name, value } = e.target; if (name.startsWith("emergencyContact1.")) { const field = name.split('.')[1]; setProfileData(prev => ({ ...prev, emergencyContact1: { ...prev.emergencyContact1, [field]: value } })); } else if (name.startsWith("emergencyContact2.")) { const field = name.split('.')[1]; setProfileData(prev => ({ ...prev, emergencyContact2: { ...prev.emergencyContact2, [field]: value } })); } else { setProfileData(prev => ({ ...prev, [name]: value })); } }; 
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => { if (event.target.files && event.target.files[0]) { const file = event.target.files[0]; const reader = new FileReader(); reader.onloadend = () => { setProfileData(prev => ({ ...prev, profileImageUrl: reader.result as string })); }; reader.readAsDataURL(file); } }; 
  const handleSaveProfile = () => { const thaiPhoneRegex = /^0[689]\d{1}-\d{3}-\d{4}$/; if (profileData.phone && !thaiPhoneRegex.test(profileData.phone)) { addNotification('Please enter a valid Thai phone number (e.g., 081-234-5678).', 'error'); return; } const updatedUser = { ...currentUser, ...profileData, avatar: `${profileData.firstName[0]}${profileData.lastName[0]}`.toUpperCase() }; setCurrentUser(updatedUser); setUsersDB(prevDB => prevDB.map(u => u.id === currentUser.id ? updatedUser : u)); addNotification('Profile updated successfully!', 'success'); setIsEditing(false); };
  const handleMockKYCUpload = () => { setCurrentUser(prev => prev ? ({...prev, identityVerified: 'Pending', kycDocsStatus: 'Pending'}) : null); addNotification('ID documents submitted for review (Mock).', 'info'); };
  const handleMockBankConnect = () => { setCurrentUser(prev => prev ? ({...prev, bankConnected: true, bankCardStatus: 'Completed'}) : null); addNotification('Bank account connected (Mock).', 'success'); };

  const VerificationStep: React.FC<{title: string; icon: LucideIcon; status: User['kycDocsStatus'] | User['personalInfoStatus'] | User['bankCardStatus']; onAction?: () => void; actionText?: string;}> = ({ title, icon: Icon, status, onAction, actionText }) => (
    <div className={`p-4 rounded-lg border flex items-center justify-between ${status === 'Completed' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
      <div className="flex items-center"> <Icon className={`w-8 h-8 mr-3 ${status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`} /> <div> <h4 className="font-semibold text-gray-800">{title}</h4> <p className={`text-xs ${status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{status}</p> </div> </div>
      {status !== 'Completed' && onAction && ( <button onClick={onAction} className="text-sm bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"> {actionText || "Update"} </button> )}
    </div>
  );

  return ( <div className="space-y-6"> <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div className="flex items-center space-x-4"> { (profileData.profileImageUrl || currentUser.profileImageUrl) ? ( <img src={profileData.profileImageUrl || currentUser.profileImageUrl!} alt="Profile" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover bg-gray-200" /> ) : ( <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold"> {currentUser.avatar} </div> )} <div><h1 className="text-2xl md:text-3xl font-bold text-gray-900">{`${currentUser.firstName} ${currentUser.lastName}`}</h1><p className="text-gray-600 text-sm">Joined on {new Date(currentUser.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div> </div> <button onClick={() => setIsEditing(!isEditing)} className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 text-sm transition-colors ${isEditing ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'}`}> {isEditing ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}<span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span></button> </div> 
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"> <h2 className="text-xl font-semibold text-gray-800 mb-1">Profile Completion</h2> <p className="text-sm text-gray-500 mb-4">Complete your profile to enhance your loan application speed and access all features.</p> <div className="space-y-3"> <VerificationStep title="Identity Verification (KYC)" icon={ShieldCheck} status={currentUser.kycDocsStatus} onAction={handleMockKYCUpload} actionText="Upload Documents"/> <VerificationStep title="Personal Information" icon={UserCheck} status={currentUser.personalInfoStatus} onAction={() => setIsEditing(true)} actionText={currentUser.personalInfoStatus === "Fill Up" ? "Fill Up" : "Update"}/> <VerificationStep title="Bank Details" icon={Landmark} status={currentUser.bankCardStatus} onAction={handleMockBankConnect} actionText="Connect Bank"/> </div> </div>
    {isEditing && ( <> <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"> <h3 className="text-lg font-semibold text-gray-700 mb-3">Update Profile Picture</h3> <input type="file" accept="image/*" capture="user" ref={profilePictureInputRef} onChange={handleProfilePictureChange} className="hidden" /> <button onClick={() => profilePictureInputRef.current && profilePictureInputRef.current.click()} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"> <Camera className="w-4 h-4" /><span>Take Photo / Upload</span> </button> {profileData.profileImageUrl && <img src={profileData.profileImageUrl} alt="Preview" className="mt-3 w-24 h-24 rounded-full object-cover"/>} </div> <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"> <h2 className="text-xl font-semibold text-gray-800 mb-5">Edit Personal Information</h2> <div className="space-y-4"> 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div><label className="block text-xs font-medium text-gray-500 mb-1">First Name</label><input type="text" name="firstName" value={profileData.firstName} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> <div><label className="block text-xs font-medium text-gray-500 mb-1">Last Name</label><input type="text" name="lastName" value={profileData.lastName} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div><label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label><input type="email" name="email" value={profileData.email} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> <div><label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label><input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} className={MODAL_INPUT_STYLE} placeholder="08X-XXX-XXXX"/></div> </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-xs font-medium text-gray-500 mb-1">Street Address</label><input type="text" name="streetAddress" value={profileData.streetAddress} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> <div><label className="block text-xs font-medium text-gray-500 mb-1">City</label><input type="text" name="city" value={profileData.city} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-xs font-medium text-gray-500 mb-1">Province</label><input type="text" name="province" value={profileData.province} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> <div><label className="block text-xs font-medium text-gray-500 mb-1">Postal Code</label><input type="text" name="postalCode" value={profileData.postalCode} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div><label className="block text-xs font-medium text-gray-500 mb-1">Gender</label><select name="gender" value={profileData.gender} onChange={handleInputChange} className={MODAL_INPUT_STYLE}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></div> <div><label className="block text-xs font-medium text-gray-500 mb-1">Birthday</label><input type="date" name="birthday" value={profileData.birthday} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div><label className="block text-xs font-medium text-gray-500 mb-1">Marital Status</label><select name="maritalStatus" value={profileData.maritalStatus} onChange={handleInputChange} className={MODAL_INPUT_STYLE}><option value="">Select</option><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option></select></div> <div><label className="block text-xs font-medium text-gray-500 mb-1">Education Level</label><select name="educationLevel" value={profileData.educationLevel} onChange={handleInputChange} className={MODAL_INPUT_STYLE}><option value="">Select</option><option>High School</option><option>Associate Degree</option><option>Bachelor's Degree</option><option>Master's Degree</option><option>Doctorate</option><option>Other</option></select></div> </div>
    <div><label className="block text-xs font-medium text-gray-500 mb-1">Work Position</label><input type="text" name="workPosition" value={profileData.workPosition} onChange={handleInputChange} className={MODAL_INPUT_STYLE} placeholder="e.g., Software Engineer"/></div>
    <h3 className="text-md font-semibold text-gray-700 mt-4 pt-2 border-t">Emergency Contact 1</h3> <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> <div><label className="text-xs font-medium text-gray-500 mb-1">Name</label><input type="text" name="emergencyContact1.name" value={profileData.emergencyContact1.name} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> <div><label className="text-xs font-medium text-gray-500 mb-1">Phone</label><input type="tel" name="emergencyContact1.phone" value={profileData.emergencyContact1.phone} onChange={handleInputChange} className={MODAL_INPUT_STYLE} placeholder="08X-XXX-XXXX"/></div> <div><label className="text-xs font-medium text-gray-500 mb-1">Relationship</label><input type="text" name="emergencyContact1.relationship" value={profileData.emergencyContact1.relationship} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> </div>
    <h3 className="text-md font-semibold text-gray-700 mt-4 pt-2 border-t">Emergency Contact 2</h3> <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> <div><label className="text-xs font-medium text-gray-500 mb-1">Name</label><input type="text" name="emergencyContact2.name" value={profileData.emergencyContact2.name} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> <div><label className="text-xs font-medium text-gray-500 mb-1">Phone</label><input type="tel" name="emergencyContact2.phone" value={profileData.emergencyContact2.phone} onChange={handleInputChange} className={MODAL_INPUT_STYLE} placeholder="08X-XXX-XXXX"/></div> <div><label className="text-xs font-medium text-gray-500 mb-1">Relationship</label><input type="text" name="emergencyContact2.relationship" value={profileData.emergencyContact2.relationship} onChange={handleInputChange} className={MODAL_INPUT_STYLE}/></div> </div>
    <div className="mt-6 text-right"><button onClick={handleSaveProfile} className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm">Save Changes</button></div></div> </div> </> )} 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"> <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Snapshot</h2> <div className="space-y-2.5 text-sm"> <div className="flex justify-between"><span className="text-gray-600">Credit Score:</span><span className="font-semibold text-blue-600">{currentUser.creditScore}</span></div> <div className="flex justify-between"><span className="text-gray-600">Platform Rating:</span><span className="font-semibold text-yellow-500 flex items-center"><Star className="w-3.5 h-3.5 mr-1"/> {currentUser.rating}</span></div> <div className="flex justify-between"><span className="text-gray-600">Total Lent:</span><span className="font-semibold text-green-600">${currentUser.totalLent.toLocaleString()}</span></div> <div className="flex justify-between"><span className="text-gray-600">Total Borrowed:</span><span className="font-semibold text-red-600">${currentUser.totalBorrowed.toLocaleString()}</span></div> <div className="flex justify-between"><span className="text-gray-600">Active Loans:</span><span className="font-semibold text-gray-700">{currentUser.activeLoans}</span></div> <div className="flex justify-between"><span className="text-gray-600">Completed Transactions:</span><span className="font-semibold text-gray-700">{currentUser.completedTransactions}</span></div> </div> </div> <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"> <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Status</h2> <div className="space-y-3"> {[{label: 'Identity (KYC)', status: currentUser.kycDocsStatus, action: 'Verify Identity', icon: ShieldCheck}, {label: 'Bank Account', status: currentUser.bankCardStatus, action: 'Connect Account', icon: Landmark}].map(item => ( <div key={item.label} className={`flex items-center p-3 rounded-lg ${item.status === 'Completed' ? 'bg-green-50 border-green-200' : (item.status === 'Pending' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200')}`}> <item.icon className={`w-5 h-5 mr-2.5 shrink-0 ${item.status === 'Completed' ? 'text-green-500' : (item.status === 'Pending' ? 'text-yellow-500' : 'text-red-500')}`}/> <div className="flex-grow"><span className="font-medium text-sm text-gray-700">{item.label}</span><p className={`text-xs ${item.status === 'Completed' ? 'text-green-600' : (item.status === 'Pending' ? 'text-yellow-600' : 'text-red-600')}`}>{item.status}</p></div> {item.status !== 'Completed' && !isEditing && <button className="ml-auto text-blue-600 text-xs font-medium hover:underline shrink-0">{item.action}</button>} </div>))} </div> </div> </div> </div>);
};

// --- Modals ---
const LoanApplicationModalComponent: React.FC<{currentUser: User; setLoanApplicationModal: (show: boolean) => void; submitLoanApplication: (data: any) => void; addNotification: (message: string, type?: NotificationMessage['type']) => void; calculateReferenceInterestRate: (score: number, duration: number) => number;}> = ({currentUser, setLoanApplicationModal, submitLoanApplication, addNotification, calculateReferenceInterestRate}) => {
  const [applicationData, setApplicationData] = useState({ amount: '', duration: '12', purpose: 'Business', income: '', employmentType: 'Full-time', proposedInterestRate: '' }); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setApplicationData({ ...applicationData, [e.target.name]: e.target.value }); 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); if (!applicationData.amount || !applicationData.income || !applicationData.proposedInterestRate) { addNotification('Please fill all required fields (Amount, Income, Proposed Rate, etc.).', 'error'); return; } if (parseInt(applicationData.amount) < 100) { addNotification('Minimum loan amount is $100.', 'error'); return; } if (parseFloat(applicationData.proposedInterestRate) <=0 || parseFloat(applicationData.proposedInterestRate) > 50) { addNotification('Please enter a valid interest rate (e.g., 1-50%).', 'error'); return;} submitLoanApplication(applicationData); }; 
  const referenceRate = applicationData.amount && currentUser ? calculateReferenceInterestRate(currentUser.creditScore, parseInt(applicationData.duration)) : null; 
  return ( <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 font-inter"> <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"> <div className="flex justify-between items-center mb-6"> <h2 className="text-2xl font-bold text-gray-900">Apply for a Loan</h2> <button type="button" onClick={() => setLoanApplicationModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button> </div> <div className="space-y-5"> <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> <div> <label className="block text-sm font-medium text-gray-700 mb-1.5">Loan Amount ($)</label> <input type="number" name="amount" required min="100" max="50000" value={applicationData.amount} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="e.g., 5000" /> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration (months)</label> <select name="duration" value={applicationData.duration} onChange={handleChange} className={MODAL_INPUT_STYLE}> {LOAN_DURATION_OPTIONS.map(d => <option key={d} value={d.toString()}>{d} months</option>)} </select> </div> </div> <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> <div> <label className="block text-sm font-medium text-gray-700 mb-1.5">Purpose of Loan</label> <select name="purpose" value={applicationData.purpose} onChange={handleChange} className={MODAL_INPUT_STYLE}> {LOAN_PURPOSE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)} </select> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1.5">Desired Interest Rate (%)</label> <input type="number" name="proposedInterestRate" required min="0.1" step="0.1" max="50" value={applicationData.proposedInterestRate} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="e.g., 8.5" /> {referenceRate && <p className="text-xs text-gray-500 mt-1">Platform reference rate: {referenceRate}%</p>}</div> </div> <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> <div> <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly Income ($)</label> <input type="number" name="income" required value={applicationData.income} onChange={handleChange} min="0" className={MODAL_INPUT_STYLE} placeholder="e.g., 4500" /> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment Type</label> <select name="employmentType" value={applicationData.employmentType} onChange={handleChange} className={MODAL_INPUT_STYLE}> {EMPLOYMENT_TYPE_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)} </select> </div> </div> <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2"> <button type="button" onClick={() => setLoanApplicationModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">Cancel</button> <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition font-semibold">Submit Application</button> </div> </div> </form> </div> );
};

const LendingModalComponent: React.FC<{currentUser: User; selectedLoanForLending: LoanOpportunity; lendingStep: string; setLendingStep: (step: string) => void; finalizeLending: (loanId: string | number, principal: number, fee: number) => void; addNotification: (message: string, type?: NotificationMessage['type']) => void; setLendingModal: (show: boolean) => void; setSelectedLoanForLending: (loan: LoanOpportunity|null) => void; setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;}> = ({ currentUser, selectedLoanForLending, lendingStep, setLendingStep, finalizeLending, addNotification, setLendingModal, setSelectedLoanForLending, setCurrentUser }) => {
  const [lendAmount, setLendAmount] = useState(''); const [feeAmount, setFeeAmount] = useState(0); const [principalToTransfer, setPrincipalToTransfer] = useState(0); 
  const remainingToFund = parseFloat((selectedLoanForLending.amount - (selectedLoanForLending.amount * selectedLoanForLending.funded / 100)).toFixed(2)); const maxCanLendBasedOnLoan = remainingToFund; const maxCanLendBasedOnBalance = currentUser.balance / 1.01; // 1% fee
  const maxCanLend = parseFloat(Math.min(maxCanLendBasedOnBalance, maxCanLendBasedOnLoan).toFixed(2)); 
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { const amount = e.target.value; setLendAmount(amount); if (amount && !isNaN(parseFloat(amount))) { const principal = parseFloat(amount); const fee = principal * 0.01; setFeeAmount(fee); setPrincipalToTransfer(principal); } else { setFeeAmount(0); setPrincipalToTransfer(0); } }; 
  const proceedToFeePayment = () => { const amountNum = parseFloat(lendAmount); if (isNaN(amountNum) || amountNum <= 0) { addNotification('Please enter a valid amount to lend.', 'error'); return; } if (amountNum > maxCanLend) { addNotification(`Amount (excl. fee) exceeds available balance or remaining loan amount. Max principal: $${maxCanLend.toFixed(2)}`, 'error'); return; } if (currentUser.balance < amountNum + feeAmount) { addNotification('Insufficient balance to cover principal and fee.', 'error'); return; } setLendingStep('feePayment'); }; 
  const handleFeePaid = () => { setCurrentUser(prev => prev ? ({...prev, balance: prev.balance - feeAmount}) : null); addNotification(`Fee of $${feeAmount.toFixed(2)} processed.`, 'info'); setLendingStep('transferPayment'); }; 
  const handleTransferComplete = () => { finalizeLending(selectedLoanForLending.id, principalToTransfer, feeAmount); }; 
  const resetLendingProcess = () => { setLendingModal(false); setSelectedLoanForLending(null); setLendingStep('amountEntry'); setLendAmount(''); setFeeAmount(0); setPrincipalToTransfer(0); }; 
  const qrCodeBaseUrl = "https://picsum.photos/200/200?text="; // Using picsum as placeholder
  return ( <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[60] font-inter"> <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg"> <div className="flex justify-between items-center mb-6"> <h2 className="text-xl font-bold text-gray-900">Lend to {selectedLoanForLending.borrowerName}</h2> <button type="button" onClick={resetLendingProcess} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button> </div> {lendingStep === 'amountEntry' && ( <> <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200 text-sm"> <div className="grid grid-cols-2 gap-x-4 gap-y-2"> <div><span className="text-gray-600">Loan Amount:</span><div className="font-semibold">${selectedLoanForLending.amount.toLocaleString()}</div></div> <div><span className="text-gray-600">Credit Score:</span><div className="font-semibold text-blue-600">{selectedLoanForLending.creditScore}</div></div> <div><span className="text-gray-600">Funded:</span><div className="font-semibold">{selectedLoanForLending.funded.toFixed(2)}%</div></div> <div><span className="text-gray-600">Remaining to Fund:</span><div className="font-semibold">${remainingToFund.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div></div> </div> </div> <div className="space-y-5"> <div> <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount to Lend (Principal)</label> <input type="number" required min="0.01" step="0.01" max={maxCanLend > 0 ? maxCanLend.toFixed(2) : "0"} value={lendAmount} onChange={handleAmountInputChange} className={MODAL_INPUT_STYLE} placeholder={`Max principal $${maxCanLend.toFixed(2)} (Excl. fee)`} /> <p className="text-xs text-gray-500 mt-1">Available balance: ${currentUser.balance.toFixed(2)}. A 1% fee ($ {feeAmount.toFixed(2)}) will be added.</p> </div> <button onClick={proceedToFeePayment} disabled={selectedLoanForLending.funded >= 100 || maxCanLend <=0 || lendAmount === '' || parseFloat(lendAmount) <= 0 || (parseFloat(lendAmount) + feeAmount > currentUser.balance) } className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-300">Proceed to Pay Fee</button> </div> </> )} {lendingStep === 'feePayment' && ( <div className="text-center space-y-4"> <h3 className="text-lg font-semibold">Step 1: Pay Lending Fee</h3> <p className="text-sm text-gray-700">Please pay the 1% lending fee of <strong className="text-blue-600">${feeAmount.toFixed(2)}</strong>.</p> <img src={`${qrCodeBaseUrl}Pay+Fee+$${feeAmount.toFixed(2)}`} alt="Fee QR Code" className="mx-auto rounded-lg shadow-md border" /> <p className="text-xs text-gray-500">Scan this QR code with your payment app (mock).</p> <button onClick={handleFeePaid} className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition font-semibold">I Have Paid the Fee (Mock)</button> </div> )} {lendingStep === 'transferPayment' && ( <div className="text-center space-y-4"> <h3 className="text-lg font-semibold">Step 2: Transfer Funds to Borrower</h3> <p className="text-sm text-gray-700">Fee paid. Now, please transfer the principal amount of <strong className="text-blue-600">${principalToTransfer.toFixed(2)}</strong> to the borrower.</p> <img src={`${qrCodeBaseUrl}Transfer+$${principalToTransfer.toFixed(2)}+to+${selectedLoanForLending.borrowerName.replace(/\s/g,'+')}`} alt="Transfer QR Code" className="mx-auto rounded-lg shadow-md border" /> <p className="text-xs text-gray-500">Scan this QR code to transfer funds (mock).</p> <button onClick={handleTransferComplete} className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition font-semibold">I Have Transferred the Funds (Mock)</button> </div> )} </div> </div> );
};

const ListPropertyModalComponent: React.FC<{currentUser: User; setListPropertyModal: (show: boolean) => void; handleListProperty: (data: any) => void; addNotification: (message: string, type?: NotificationMessage['type']) => void;}> = ({currentUser, setListPropertyModal, handleListProperty, addNotification}) => {
  const [propertyData, setPropertyData] = useState({ title: '', streetAddress: '', city: '', province: '', postalCode: '', rentAmount: '', bedrooms: '', bathrooms: '', squareMeterage: '', description: '', amenities: '', imageUrls: [] as string[] }); const [imagePreviews, setImagePreviews] = useState<string[]>([]); const [isGeneratingRentalDesc, setIsGeneratingRentalDesc] = useState(false); const propertyImageInputRef = useRef<HTMLInputElement>(null); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setPropertyData({ ...propertyData, [e.target.name]: e.target.value }); 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // filesArray is File[]
      const dataUrls: string[] = [];
      const previewUrls: string[] = [];
      filesArray.forEach(file => { // file is File
        if (file instanceof Blob) { // Type guard for safety and to help TypeScript
          const reader = new FileReader();
          reader.onloadend = () => {
            dataUrls.push(reader.result as string);
            previewUrls.push(URL.createObjectURL(file));
            if (dataUrls.length === filesArray.length) {
              setPropertyData(prev => ({ ...prev, imageUrls: dataUrls }));
              setImagePreviews(previewUrls);
            }
          };
          reader.readAsDataURL(file);
        } else {
          console.warn('An item in the FileList was not a Blob:', file);
        }
      });
    }
  };
  const handleGenerateRentalDescription = async () => { const { title, city, bedrooms, bathrooms, amenities } = propertyData; if (!title || !city || !bedrooms || !bathrooms) { addNotification('Please fill in Title, City, Bedrooms, and Bathrooms to generate a description.', 'warning'); return; } setIsGeneratingRentalDesc(true); addNotification('Generating property description with AI...', 'info'); const amenitiesSample = amenities.split(',').map(a=>a.trim()).filter(a=>a).slice(0,3).join(', '); const prompt = `Generate a compelling and concise 2-4 sentence rental property description. Property Title: ${title}. Location: ${city}. Bedrooms: ${bedrooms}. Bathrooms: ${bathrooms}. Key Amenities (if any): ${amenitiesSample || 'N/A'}. Highlight unique selling points and appeal to potential tenants.`; try { const desc = await generateTextContent(prompt); setPropertyData(prev => ({ ...prev, description: desc.trim() })); addNotification('Property description generated!', 'success'); } catch (error: any) { console.error('Error generating rental description:', error); addNotification(`Error: ${error.message || 'Failed to generate description.'}`, 'error'); } finally { setIsGeneratingRentalDesc(false); } }; 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); const requiredFields = ['title', 'streetAddress', 'city', 'province', 'postalCode', 'rentAmount', 'bedrooms', 'bathrooms', 'squareMeterage', 'description']; let formIsValid = true; for (let field of requiredFields) { if (!propertyData[field as keyof typeof propertyData]) { addNotification(`Please fill in the '${field.replace(/([A-Z])/g, ' $1').toLowerCase()}' field.`, 'error'); formIsValid = false; break; } } if(formIsValid) handleListProperty(propertyData); };
  return ( <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[70] font-inter"> <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"> <div className="flex justify-between items-center mb-6"> <h2 className="text-2xl font-bold text-gray-900">List Your Property for Rent</h2> <button type="button" onClick={() => setListPropertyModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button> </div> <div className="space-y-4"> <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div><label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label><input type="text" name="title" value={propertyData.title} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="e.g., Sunny 2-Bedroom Condo"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label><input type="text" name="streetAddress" value={propertyData.streetAddress} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="123 Property Lane"/></div> </div> <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input type="text" name="city" value={propertyData.city} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="Your City"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Province/State</label><input type="text" name="province" value={propertyData.province} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="CA"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label><input type="text" name="postalCode" value={propertyData.postalCode} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="A1B 2C3"/></div> </div> <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div><label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent ($)</label><input type="number" name="rentAmount" value={propertyData.rentAmount} onChange={handleChange} min="0" className={MODAL_INPUT_STYLE} placeholder="2000"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Square Meters (sqm)</label><input type="number" name="squareMeterage" value={propertyData.squareMeterage} onChange={handleChange} min="0" className={MODAL_INPUT_STYLE} placeholder="100"/></div> </div> <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div><label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label><input type="number" name="bedrooms" value={propertyData.bedrooms} onChange={handleChange} min="0" step="1" className={MODAL_INPUT_STYLE} placeholder="2"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label><input type="number" name="bathrooms" value={propertyData.bathrooms} onChange={handleChange} min="0" step="1" className={MODAL_INPUT_STYLE} placeholder="1"/></div> </div> <div> <div className="flex justify-between items-center mb-1"> <label className="block text-sm font-medium text-gray-700">Description</label> <button type="button" onClick={handleGenerateRentalDescription} disabled={isGeneratingRentalDesc || !propertyData.title || !propertyData.city || !propertyData.bedrooms || !propertyData.bathrooms} className="flex items-center space-x-1.5 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 px-2.5 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"> <Sparkles className="w-3.5 h-3.5" /> <span>{isGeneratingRentalDesc ? 'Generating...' : '✨ Generate Description'}</span> </button> </div> <textarea name="description" rows={3} value={propertyData.description} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="Describe your property..."></textarea></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label><input type="text" name="amenities" value={propertyData.amenities} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="e.g., Parking, In-unit Laundry, Balcony"/></div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Property Images (Max 5)</label> <input type="file" accept="image/*" multiple onChange={handleImageChange} ref={propertyImageInputRef} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/> {imagePreviews.length > 0 && ( <div className="mt-2 flex space-x-2 overflow-x-auto"> {imagePreviews.map((previewUrl, index) => ( <img key={index} src={previewUrl} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded-md border"/> ))} </div> )} </div> <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2"> <button type="button" onClick={() => setListPropertyModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">Cancel</button> <button type="submit" className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition font-semibold">List Property</button> </div> </div> </form> </div> );
};

const ListPropertyForSaleModalComponent: React.FC<{currentUser: User; setListPropertyForSaleModal: (show: boolean) => void; handleListPropertyForSale: (data: any) => void; addNotification: (message: string, type?: NotificationMessage['type']) => void;}> = ({currentUser, setListPropertyForSaleModal, handleListPropertyForSale, addNotification}) => {
  const [propertyData, setPropertyData] = useState({ title: '', streetAddress: '', city: '', province: '', postalCode: '', price: '', propertyType: 'House', bedrooms: '', bathrooms: '', squareMeterage: '', description: '', imageUrls: [] as string[] }); const [imagePreviews, setImagePreviews] = useState<string[]>([]); const [isGeneratingSaleDesc, setIsGeneratingSaleDesc] = useState(false); const propertyImageInputRef = useRef<HTMLInputElement>(null); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setPropertyData({ ...propertyData, [e.target.name]: e.target.value }); 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // filesArray is File[]
      const dataUrls: string[] = [];
      const previewUrls: string[] = [];
      filesArray.forEach(file => { // file is File
        if (file instanceof Blob) { // Type guard for safety and to help TypeScript
          const reader = new FileReader();
          reader.onloadend = () => {
            dataUrls.push(reader.result as string);
            previewUrls.push(URL.createObjectURL(file));
            if (dataUrls.length === filesArray.length) {
              setPropertyData(prev => ({ ...prev, imageUrls: dataUrls }));
              setImagePreviews(previewUrls);
            }
          };
          reader.readAsDataURL(file);
        } else {
          console.warn('An item in the FileList was not a Blob:', file);
        }
      });
    }
  };
  const handleGenerateSaleDescription = async () => { const { title, city, propertyType, bedrooms, bathrooms, squareMeterage } = propertyData; if (!title || !city || !propertyType || !bedrooms || !bathrooms || !squareMeterage) { addNotification('Please fill in Title, City, Property Type, Bedrooms, Bathrooms, and SqM to generate a description.', 'warning'); return; } setIsGeneratingSaleDesc(true); addNotification('Generating property description with AI...', 'info'); const prompt = `Generate an attractive and concise 2-4 sentence property sales description. Property: ${title} (${propertyType}). Location: ${city}. Features: ${bedrooms} bedrooms, ${bathrooms} bathrooms, ${squareMeterage} sqm. Highlight key selling points for potential buyers.`; try { const desc = await generateTextContent(prompt); setPropertyData(prev => ({ ...prev, description: desc.trim() })); addNotification('Property description generated!', 'success'); } catch (error: any) { console.error('Error generating sale description:', error); addNotification(`Error: ${error.message || 'Failed to generate description.'}`, 'error'); } finally { setIsGeneratingSaleDesc(false); } }; 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); const requiredFields = ['title', 'streetAddress', 'city', 'province', 'postalCode', 'price', 'propertyType', 'bedrooms', 'bathrooms', 'squareMeterage', 'description']; let formIsValid = true; for (let field of requiredFields) { if (!propertyData[field as keyof typeof propertyData]) { addNotification(`Please fill in the '${field.replace(/([A-Z])/g, ' $1').toLowerCase()}' field.`, 'error'); formIsValid = false; break; } } if(formIsValid) handleListPropertyForSale(propertyData); };
  return ( <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[70] font-inter"> <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"> <div className="flex justify-between items-center mb-6"> <h2 className="text-2xl font-bold text-gray-900">List Your Property for Sale</h2> <button type="button" onClick={() => setListPropertyForSaleModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button> </div> <div className="space-y-4"> 
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div><label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label><input type="text" name="title" value={propertyData.title} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="e.g., Modern Family Home"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label><input type="text" name="streetAddress" value={propertyData.streetAddress} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="456 Property Ave"/></div> </div> 
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input type="text" name="city" value={propertyData.city} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="Your City"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Province/State</label><input type="text" name="province" value={propertyData.province} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="TX"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label><input type="text" name="postalCode" value={propertyData.postalCode} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="D4E 5F6"/></div> </div> 
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div><label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($)</label><input type="number" name="price" value={propertyData.price} onChange={handleChange} min="0" className={MODAL_INPUT_STYLE} placeholder="500000"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label><select name="propertyType" value={propertyData.propertyType} onChange={handleChange} className={MODAL_INPUT_STYLE}>{PROPERTY_TYPE_OPTIONS.map(type => <option key={type} value={type}>{type}</option>)}</select></div></div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> <div><label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label><input type="number" name="bedrooms" value={propertyData.bedrooms} onChange={handleChange} min="0" step="1" className={MODAL_INPUT_STYLE} placeholder="3"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label><input type="number" name="bathrooms" value={propertyData.bathrooms} onChange={handleChange} min="0" step="0.5" className={MODAL_INPUT_STYLE} placeholder="2.5"/></div> <div><label className="block text-sm font-medium text-gray-700 mb-1">Square Meters (sqm)</label><input type="number" name="squareMeterage" value={propertyData.squareMeterage} onChange={handleChange} min="0" className={MODAL_INPUT_STYLE} placeholder="200"/></div> </div> 
  <div> <div className="flex justify-between items-center mb-1"> <label className="block text-sm font-medium text-gray-700">Description</label> <button type="button" onClick={handleGenerateSaleDescription} disabled={isGeneratingSaleDesc || !propertyData.title || !propertyData.city || !propertyData.propertyType || !propertyData.bedrooms || !propertyData.bathrooms || !propertyData.squareMeterage} className="flex items-center space-x-1.5 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 px-2.5 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"> <Sparkles className="w-3.5 h-3.5" /> <span>{isGeneratingSaleDesc ? 'Generating...' : '✨ Generate Description'}</span> </button> </div> <textarea name="description" rows={3} value={propertyData.description} onChange={handleChange} className={MODAL_INPUT_STYLE} placeholder="Describe the property for sale..."></textarea></div> 
  <div> <label className="block text-sm font-medium text-gray-700 mb-1">Property Images (Max 5)</label> <input type="file" accept="image/*" multiple onChange={handleImageChange} ref={propertyImageInputRef} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"/> {imagePreviews.length > 0 && ( <div className="mt-2 flex space-x-2 overflow-x-auto"> {imagePreviews.map((previewUrl, index) => ( <img key={index} src={previewUrl} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded-md border"/> ))} </div> )} </div> 
  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2"> <button type="button" onClick={() => setListPropertyForSaleModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">Cancel</button> <button type="submit" className="flex-1 bg-orange-500 text-white py-2.5 px-4 rounded-lg hover:bg-orange-600 transition font-semibold">List Property for Sale</button> </div> </div> </form> </div> );
};

const RentalApplicationModalComponent: React.FC<{currentUser: User; selectedRental: RentalProperty; setRentalApplicationModal: (show: boolean) => void; mockRentalApplied: boolean; setMockRentalApplied: (applied: boolean) => void; handleGenerateContract: (type: ContractType, data: ContractData) => void; isGeneratingContract: boolean; addNotification: (message: string, type?: NotificationMessage['type']) => void;}> = ({currentUser, selectedRental, setRentalApplicationModal, mockRentalApplied, setMockRentalApplied, handleGenerateContract, isGeneratingContract, addNotification}) => {
  const handleApplyMock = () => { addNotification(`Application submitted for ${selectedRental.title}! (Mock)`, 'success'); setMockRentalApplied(true); }; 
  const triggerRentalContractGeneration = () => { const data: ContractData = { landlordName: selectedRental.landlordName, tenantName: `${currentUser.firstName} ${currentUser.lastName}`, propertyAddress: `${selectedRental.streetAddress}, ${selectedRental.city}, ${selectedRental.province} ${selectedRental.postalCode}`, rentAmount: selectedRental.rentAmount, leaseStartDate: new Date().toLocaleDateString(), leaseEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(), securityDeposit: selectedRental.rentAmount, // Example security deposit
  date: new Date().toLocaleDateString(), }; handleGenerateContract('rental', data); };
  return ( <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[70] font-inter"> <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"> <div className="flex justify-between items-center mb-4"> <h2 className="text-2xl font-bold text-gray-900">{selectedRental.title}</h2> <button type="button" onClick={() => setRentalApplicationModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button> </div> <img src={selectedRental.imageUrls[0] || `https://picsum.photos/600/400?text=${encodeURIComponent(selectedRental.title)}`} alt={selectedRental.title} className="w-full h-64 object-cover rounded-lg mb-4"/> <p className="text-sm text-gray-500 mb-2"><MapPin className="w-4 h-4 inline mr-1"/>{selectedRental.streetAddress}, {selectedRental.city}, {selectedRental.province} {selectedRental.postalCode}</p> <div className="flex items-center justify-between text-lg mb-3"> <span className="font-bold text-blue-600">${selectedRental.rentAmount.toLocaleString()}/month</span> <div className="flex space-x-4 text-gray-700"> <span className="flex items-center"><BedDouble className="w-5 h-5 mr-1 text-blue-500"/> {selectedRental.bedrooms === 0 ? 'Studio' : selectedRental.bedrooms}</span> <span className="flex items-center"><Bath className="w-5 h-5 mr-1 text-blue-500"/> {selectedRental.bathrooms}</span> <span className="flex items-center"><Maximize className="w-5 h-5 mr-1 text-blue-500"/> {selectedRental.squareMeterage} sqm</span> </div> </div> <p className="text-sm text-gray-700 mb-4">{selectedRental.description}</p> {selectedRental.amenities && selectedRental.amenities.length > 0 && ( <div className="mb-4"> <h4 className="font-semibold text-gray-800 mb-1.5">Amenities:</h4> <div className="flex flex-wrap gap-2"> {selectedRental.amenities.map(amenity => <span key={amenity} className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">{amenity}</span>)} </div> </div> )} <p className="text-xs text-gray-500 mb-4">Listed by: {selectedRental.landlordName}</p> {!mockRentalApplied ? ( <button onClick={handleApplyMock} className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition font-semibold">Apply to Rent (Mock)</button> ) : ( <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center"> <p className="text-green-700 font-medium mb-2">Application Submitted (Mock)!</p> <button onClick={triggerRentalContractGeneration} disabled={isGeneratingContract} className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"> <FileText className="w-4 h-4"/><span>{isGeneratingContract ? 'Generating...' : '📜 Generate Rental Agreement (Ref.)'}</span> </button> </div> )} </div> </div> );
};

const ContractDisplayModalComponent: React.FC<{generatedContractText: string; contractTypeForModal: ContractType | ''; setShowContractModal: (show: boolean) => void; downloadContractText: (text: string, type: ContractType | '') => void;}> = ({generatedContractText, contractTypeForModal, setShowContractModal, downloadContractText}) => {
  return ( <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[80] font-inter"> <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] flex flex-col"> <div className="flex justify-between items-center mb-4"> <h2 className="text-xl font-bold text-gray-900">{contractTypeForModal === 'loan' ? 'Loan Agreement (Reference)' : 'Rental Agreement (Reference)'}</h2> <button type="button" onClick={() => setShowContractModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button> </div> <div className="flex-grow overflow-y-auto bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4"> <pre className="whitespace-pre-wrap text-xs text-gray-700 leading-relaxed">{generatedContractText || "Loading contract..."}</pre> </div> <div className="flex flex-col sm:flex-row gap-3"> <button onClick={() => downloadContractText(generatedContractText, contractTypeForModal)} className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition font-semibold">Download (.txt)</button> <button type="button" onClick={() => setShowContractModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">Close</button> </div> </div> </div> );
};

const AIInsightModalComponent: React.FC<{selectedLoanForInsight: LoanOpportunity; aiInsightText: string; isFetchingAIInsight: boolean; setShowAIInsightModal: (show: boolean) => void;}> = ({selectedLoanForInsight, aiInsightText, isFetchingAIInsight, setShowAIInsightModal}) => {
  return ( <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[70] font-inter"> <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] flex flex-col"> <div className="flex justify-between items-center mb-4"> <h2 className="text-xl font-bold text-gray-900 flex items-center"> <Lightbulb className="w-5 h-5 text-purple-500 mr-2" /> AI Insights for Loan </h2> <button type="button" onClick={() => setShowAIInsightModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button> </div> <div className="mb-3 text-sm"> <p><strong>Borrower:</strong> {selectedLoanForInsight.borrowerName}</p> <p><strong>Amount:</strong> ${selectedLoanForInsight.amount.toLocaleString()}</p> <p><strong>Purpose:</strong> {selectedLoanForInsight.purpose}</p> <p><strong>Rate:</strong> {selectedLoanForInsight.proposedInterestRate}% APR</p> </div> <div className="flex-grow overflow-y-auto bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4"> {isFetchingAIInsight ? ( <div className="flex items-center justify-center h-full"> <Sparkles className="w-8 h-8 text-purple-500 animate-pulse mr-2" /> <p className="text-gray-600">Generating insights...</p> </div> ) : ( <pre className="whitespace-pre-wrap text-xs text-gray-700 leading-relaxed">{aiInsightText}</pre> )} </div> <p className="text-xxs text-gray-500 mb-3 text-center">Disclaimer: AI insights are for informational purposes only and not financial advice. Always do your own research.</p> <button type="button" onClick={() => setShowAIInsightModal(false)} className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition font-semibold">Close</button> </div> </div> );
};

const NotificationPanelComponent: React.FC<{notifications: NotificationMessage[]; setNotifications: React.Dispatch<React.SetStateAction<NotificationMessage[]>>; showNotificationPanel: boolean;}> = ({notifications, setNotifications, showNotificationPanel}) => {
  if (!showNotificationPanel) return null;
  return ( <div className="absolute top-12 right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 z-50 max-h-80 overflow-y-auto"> <div className="flex justify-between items-center mb-2.5"> <h3 className="text-sm font-semibold text-gray-800">Notifications</h3> <button onClick={() => setNotifications([])} className="text-xs text-blue-600 hover:underline disabled:text-gray-400" disabled={notifications.length === 0}>Clear All</button> </div> {notifications.length > 0 ? ( <div className="space-y-2.5"> {notifications.map(n => ( <div key={n.id} className={`p-2 rounded-md border-l-4 ${ n.type === 'success' ? 'bg-green-50 border-green-400 text-green-700' : n.type === 'error' ? 'bg-red-50 border-red-400 text-red-700' : n.type === 'warning' ? 'bg-yellow-50 border-yellow-400 text-yellow-700' : 'bg-blue-50 border-blue-400 text-blue-700' }`}> <p className="text-xs leading-snug">{n.message}</p> <p className="text-xxs text-gray-400 mt-0.5">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> </div> ))} </div> ) : ( <p className="text-xs text-gray-500 text-center py-3">No new notifications.</p> )} </div> );
};


export default App;
