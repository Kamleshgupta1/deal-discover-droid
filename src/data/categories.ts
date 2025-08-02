import { 
  Car, 
  Utensils, 
  ShoppingCart, 
  Plane, 
  Building, 
  Ticket, 
  Package,
  MapPin,
  Stethoscope,
  Film,
  Truck,
  Heart,
  Gamepad2,
  GraduationCap,
  Home,
  CreditCard,
  Banknote,
  TrendingUp,
  Shield,
  Phone,
  Wifi,
  Zap,
  Wrench,
  Users,
  BookOpen,
  Music,
  Camera,
  Coffee
} from 'lucide-react';
import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'food-delivery',
    name: 'Food Delivery',
    icon: Utensils,
    priority: 1,
    platforms: [
      { 
        name: 'Swiggy', 
        url: 'https://www.swiggy.com', 
        color: '#FC8A06',
        features: ['Fast Delivery', 'Wide Selection', 'Live Tracking']
      },
      { 
        name: 'Zomato', 
        url: 'https://www.zomato.com', 
        color: '#E23744',
        features: ['Quality Food', 'Restaurant Reviews', 'Gold Membership']
      },
      { 
        name: 'Uber Eats', 
        url: 'https://www.ubereats.com', 
        color: '#000000',
        features: ['Global Brands', 'Quick Service', 'Uber Integration']
      }
    ]
  },
  {
    id: 'grocery',
    name: 'Grocery',
    icon: ShoppingCart,
    priority: 2,
    platforms: [
      { 
        name: 'Blinkit', 
        url: 'https://blinkit.com', 
        color: '#FFDD00',
        features: ['10-min Delivery', 'Fresh Produce', '24/7 Service']
      },
      { 
        name: 'BigBasket', 
        url: 'https://www.bigbasket.com', 
        color: '#84C225',
        features: ['Bulk Orders', 'Scheduled Delivery', 'Organic Options']
      },
      { 
        name: 'Amazon Fresh', 
        url: 'https://www.amazon.in/fresh', 
        color: '#FF9900',
        features: ['Prime Benefits', 'Same Day Delivery', 'Wide Range']
      }
    ]
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: Plane,
    priority: 3,
    platforms: [
      { 
        name: 'MakeMyTrip', 
        url: 'https://www.makemytrip.com', 
        color: '#E73C7E',
        features: ['Flight Booking', 'Holiday Packages', 'Travel Insurance']
      },
      { 
        name: 'Goibibo', 
        url: 'https://www.goibibo.com', 
        color: '#F79F1F',
        features: ['Bus Booking', 'Hotel Deals', 'goCash Rewards']
      },
      { 
        name: 'Cleartrip', 
        url: 'https://www.cleartrip.com', 
        color: '#FF6B35',
        features: ['Easy Booking', 'Flexible Dates', 'Clean Interface']
      }
    ]
  },
  {
    id: 'ride-booking',
    name: 'Ride Booking',
    icon: Car,
    priority: 4,
    platforms: [
      { 
        name: 'Uber', 
        url: 'https://www.uber.com', 
        color: '#000000',
        features: ['Global Service', 'Multiple Options', 'Ride Sharing']
      },
      { 
        name: 'Ola', 
        url: 'https://www.olacabs.com', 
        color: '#00D100',
        features: ['Local Focus', 'Auto Rickshaw', 'Outstation']
      },
      { 
        name: 'Rapido', 
        url: 'https://rapido.bike', 
        color: '#FFD700',
        features: ['Bike Taxi', 'Quick Rides', 'Traffic Beating']
      }
    ]
  },
  {
    id: 'medicine',
    name: 'Medicine',
    icon: Stethoscope,
    priority: 5,
    platforms: [
      { 
        name: 'PharmEasy', 
        url: 'https://pharmeasy.in', 
        color: '#1B8F47',
        features: ['Medicine Delivery', 'Lab Tests', 'Health Records']
      },
      { 
        name: 'Apollo Pharmacy', 
        url: 'https://www.apollopharmacy.in', 
        color: '#00A859',
        features: ['Prescription Upload', 'Genuine Medicines', 'Expert Consultation']
      },
      { 
        name: '1mg', 
        url: 'https://www.1mg.com', 
        color: '#FF6F61',
        features: ['Medicine Info', 'Health Articles', 'Quick Delivery']
      }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: Film,
    priority: 6,
    platforms: [
      { 
        name: 'BookMyShow', 
        url: 'https://in.bookmyshow.com', 
        color: '#DC2626',
        features: ['Movie Tickets', 'Event Booking', 'Seat Selection']
      },
      { 
        name: 'Netflix', 
        url: 'https://www.netflix.com', 
        color: '#E50914',
        features: ['Streaming', 'Original Content', 'Multiple Devices']
      },
      { 
        name: 'Amazon Prime', 
        url: 'https://www.primevideo.com', 
        color: '#00A8E1',
        features: ['Prime Video', 'Free Delivery', 'Music Streaming']
      }
    ]
  },
  {
    id: 'hotels',
    name: 'Hotels',
    icon: Building,
    priority: 7,
    platforms: [
      { 
        name: 'OYO', 
        url: 'https://www.oyorooms.com', 
        color: '#E60023',
        features: ['Budget Stays', 'Standardized Rooms', 'Easy Booking']
      },
      { 
        name: 'Booking.com', 
        url: 'https://www.booking.com', 
        color: '#003580',
        features: ['Free Cancellation', 'Verified Reviews', 'Best Price Guarantee']
      },
      { 
        name: 'Agoda', 
        url: 'https://www.agoda.com', 
        color: '#B71C1C',
        features: ['Asia Focus', 'Member Discounts', 'Instant Confirmation']
      }
    ]
  },
  {
    id: 'ecommerce',
    name: 'Shopping',
    icon: Package,
    priority: 8,
    platforms: [
      { 
        name: 'Amazon', 
        url: 'https://www.amazon.in', 
        color: '#FF9900',
        features: ['Prime Delivery', 'Vast Selection', 'Easy Returns']
      },
      { 
        name: 'Flipkart', 
        url: 'https://www.flipkart.com', 
        color: '#2874F0',
        features: ['Big Billion Days', 'Plus Membership', 'No Cost EMI']
      },
      { 
        name: 'Myntra', 
        url: 'https://www.myntra.com', 
        color: '#FF3F6C',
        features: ['Fashion Focus', 'Brand Variety', 'Easy Returns']
      }
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness',
    icon: Heart,
    priority: 9,
    platforms: [
      { 
        name: 'Cult.fit', 
        url: 'https://www.cult.fit', 
        color: '#FF4757',
        features: ['Gym Workouts', 'Home Fitness', 'Mental Wellness']
      },
      { 
        name: 'Fitpass', 
        url: 'https://www.fitpass.co.in', 
        color: '#2ECC71',
        features: ['Multiple Gyms', 'Flexible Plans', 'Fitness Tracking']
      }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    priority: 10,
    platforms: [
      { 
        name: 'BYJU\'S', 
        url: 'https://byjus.com', 
        color: '#800080',
        features: ['Personalized Learning', 'Video Lessons', 'Test Prep']
      },
      { 
        name: 'Unacademy', 
        url: 'https://unacademy.com', 
        color: '#08BD80',
        features: ['Live Classes', 'Expert Educators', 'Competitive Exams']
      }
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    priority: 11,
    platforms: [
      { 
        name: 'Steam', 
        url: 'https://store.steampowered.com', 
        color: '#171A21',
        features: ['PC Gaming', 'Game Library', 'Community Features']
      },
      { 
        name: 'Epic Games', 
        url: 'https://www.epicgames.com', 
        color: '#313131',
        features: ['Free Weekly Games', 'Exclusive Titles', 'Creator Support']
      }
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: Truck,
    priority: 12,
    platforms: [
      { 
        name: 'Porter', 
        url: 'https://porter.in', 
        color: '#FF6B35',
        features: ['Goods Transport', 'City & Intercity', 'Live Tracking']
      },
      { 
        name: 'Pickrr', 
        url: 'https://www.pickrr.com', 
        color: '#FF9500',
        features: ['Shipping Solutions', 'Multiple Carriers', 'API Integration']
      }
    ]
  },
  {
    id: 'hyperlocal',
    name: 'Hyperlocal',
    icon: MapPin,
    priority: 13,
    platforms: [
      { 
        name: 'Dunzo', 
        url: 'https://www.dunzo.com', 
        color: '#0093FF',
        features: ['Anything Delivery', 'Pet Supplies', 'Quick Errands']
      },
      { 
        name: 'Urban Company', 
        url: 'https://www.urbancompany.com', 
        color: '#6B46C1',
        features: ['Home Services', 'Professional Care', 'Trusted Partners']
      }
    ]
  },
  {
    id: 'home-services',
    name: 'Home Services',
    icon: Home,
    priority: 14,
    platforms: [
      { 
        name: 'Urban Company', 
        url: 'https://www.urbancompany.com', 
        color: '#6B46C1',
        features: ['Professional Services', 'Verified Partners', 'Quality Assurance']
      },
      { 
        name: 'Housejoy', 
        url: 'https://www.housejoy.in', 
        color: '#FF6B6B',
        features: ['Home Repairs', 'Cleaning Services', 'Installation']
      }
    ]
  },
  {
    id: 'banking',
    name: 'Banking',
    icon: Banknote,
    priority: 15,
    platforms: [
      { 
        name: 'HDFC Bank', 
        url: 'https://www.hdfcbank.com', 
        color: '#004C8F',
        features: ['Digital Banking', 'Loan Services', 'Credit Cards']
      },
      { 
        name: 'ICICI Bank', 
        url: 'https://www.icicibank.com', 
        color: '#F37020',
        features: ['Net Banking', 'Investment Options', 'Quick Loans']
      },
      { 
        name: 'SBI', 
        url: 'https://www.onlinesbi.com', 
        color: '#1F4E79',
        features: ['Government Services', 'Rural Banking', 'Pension Schemes']
      }
    ]
  },
  {
    id: 'financial-services',
    name: 'Financial Services',
    icon: CreditCard,
    priority: 16,
    platforms: [
      { 
        name: 'Paytm', 
        url: 'https://paytm.com', 
        color: '#00BAF2',
        features: ['Digital Payments', 'Bill Payments', 'Wallet Services']
      },
      { 
        name: 'PhonePe', 
        url: 'https://www.phonepe.com', 
        color: '#5F259F',
        features: ['UPI Payments', 'Money Transfer', 'Merchant Services']
      },
      { 
        name: 'Google Pay', 
        url: 'https://pay.google.com', 
        color: '#4285F4',
        features: ['Quick Payments', 'Rewards', 'Security']
      }
    ]
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    icon: TrendingUp,
    priority: 17,
    platforms: [
      { 
        name: 'Groww', 
        url: 'https://groww.in', 
        color: '#00D09C',
        features: ['Zero Commission', 'SIP Investment', 'Portfolio Tracking']
      },
      { 
        name: 'Zerodha Coin', 
        url: 'https://coin.zerodha.com', 
        color: '#387ED1',
        features: ['Direct Funds', 'No Transaction Fees', 'Goal Planning']
      },
      { 
        name: 'Kuvera', 
        url: 'https://kuvera.in', 
        color: '#2E7D32',
        features: ['Free Investment', 'Tax Planning', 'Family Portfolio']
      }
    ]
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: Shield,
    priority: 18,
    platforms: [
      { 
        name: 'PolicyBazaar', 
        url: 'https://www.policybazaar.com', 
        color: '#ED1C24',
        features: ['Compare Policies', 'Instant Quotes', 'Expert Advice']
      },
      { 
        name: 'Acko', 
        url: 'https://www.acko.com', 
        color: '#FF6B35',
        features: ['Digital Insurance', 'Zero Paperwork', 'Quick Claims']
      },
      { 
        name: 'Digit Insurance', 
        url: 'https://www.godigit.com', 
        color: '#FF6B6B',
        features: ['General Insurance', 'Mobile App', 'Easy Claims']
      }
    ]
  },
  {
    id: 'telecom',
    name: 'Telecom',
    icon: Phone,
    priority: 19,
    platforms: [
      { 
        name: 'Jio', 
        url: 'https://www.jio.com', 
        color: '#0066CC',
        features: ['5G Network', 'Digital Services', 'Affordable Plans']
      },
      { 
        name: 'Airtel', 
        url: 'https://www.airtel.in', 
        color: '#E60000',
        features: ['Premium Network', 'Xstream Services', 'International Roaming']
      },
      { 
        name: 'Vi', 
        url: 'https://www.myvi.in', 
        color: '#662D91',
        features: ['Data Plans', 'Voice Services', 'Entertainment']
      }
    ]
  },
  {
    id: 'internet',
    name: 'Internet & Broadband',
    icon: Wifi,
    priority: 20,
    platforms: [
      { 
        name: 'Jio Fiber', 
        url: 'https://www.jio.com/fiber', 
        color: '#0066CC',
        features: ['High Speed Internet', 'TV Streaming', 'Security Services']
      },
      { 
        name: 'Airtel Xstream Fiber', 
        url: 'https://www.airtel.in/broadband', 
        color: '#E60000',
        features: ['Unlimited Data', 'Premium Support', 'Smart Home']
      },
      { 
        name: 'BSNL Broadband', 
        url: 'https://www.bsnl.co.in', 
        color: '#FFD700',
        features: ['Government Service', 'Rural Coverage', 'Affordable Plans']
      }
    ]
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: Zap,
    priority: 21,
    platforms: [
      { 
        name: 'BESCOM', 
        url: 'https://bescom.karnataka.gov.in', 
        color: '#2E7D32',
        features: ['Electricity Bills', 'Online Services', 'Power Management']
      },
      { 
        name: 'Paytm Bills', 
        url: 'https://paytm.com/bill-payment', 
        color: '#00BAF2',
        features: ['All Bill Payments', 'Instant Payments', 'Cashback Offers']
      },
      { 
        name: 'Amazon Pay Bills', 
        url: 'https://www.amazon.in/bill-payments', 
        color: '#FF9900',
        features: ['Multiple Utilities', 'Rewards', 'Auto Pay']
      }
    ]
  },
  {
    id: 'social-media',
    name: 'Social Media',
    icon: Users,
    priority: 22,
    platforms: [
      { 
        name: 'Facebook', 
        url: 'https://www.facebook.com', 
        color: '#1877F2',
        features: ['Social Networking', 'Marketplace', 'Business Pages']
      },
      { 
        name: 'Instagram', 
        url: 'https://www.instagram.com', 
        color: '#E4405F',
        features: ['Photo Sharing', 'Stories', 'Reels']
      },
      { 
        name: 'Twitter', 
        url: 'https://twitter.com', 
        color: '#1DA1F2',
        features: ['Microblogging', 'News Updates', 'Trending Topics']
      }
    ]
  },
  {
    id: 'news-media',
    name: 'News & Media',
    icon: BookOpen,
    priority: 23,
    platforms: [
      { 
        name: 'Times of India', 
        url: 'https://timesofindia.indiatimes.com', 
        color: '#C41E3A',
        features: ['Breaking News', 'Regional News', 'Sports Updates']
      },
      { 
        name: 'NDTV', 
        url: 'https://www.ndtv.com', 
        color: '#FF6B35',
        features: ['Live TV', 'Opinion', 'Fact Check']
      },
      { 
        name: 'The Hindu', 
        url: 'https://www.thehindu.com', 
        color: '#1B5E20',
        features: ['In-depth Analysis', 'Editorial', 'Premium Content']
      }
    ]
  },
  {
    id: 'music-streaming',
    name: 'Music Streaming',
    icon: Music,
    priority: 24,
    platforms: [
      { 
        name: 'Spotify', 
        url: 'https://open.spotify.com', 
        color: '#1DB954',
        features: ['Music Library', 'Podcasts', 'Playlists']
      },
      { 
        name: 'JioSaavn', 
        url: 'https://www.jiosaavn.com', 
        color: '#FF6B35',
        features: ['Indian Music', 'Regional Songs', 'Offline Downloads']
      },
      { 
        name: 'YouTube Music', 
        url: 'https://music.youtube.com', 
        color: '#FF0000',
        features: ['Video Music', 'Live Performances', 'Recommendations']
      }
    ]
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: Camera,
    priority: 25,
    platforms: [
      { 
        name: 'Shutterstock', 
        url: 'https://www.shutterstock.com', 
        color: '#EE3F24',
        features: ['Stock Photos', 'Vector Graphics', 'Video Clips']
      },
      { 
        name: 'Adobe Stock', 
        url: 'https://stock.adobe.com', 
        color: '#FF0000',
        features: ['High Quality Images', 'Creative Assets', 'Integration']
      },
      { 
        name: 'Unsplash', 
        url: 'https://unsplash.com', 
        color: '#000000',
        features: ['Free Images', 'High Resolution', 'Community']
      }
    ]
  },
  {
    id: 'cafe-restaurants',
    name: 'Cafes & Restaurants',
    icon: Coffee,
    priority: 26,
    platforms: [
      { 
        name: 'Dineout', 
        url: 'https://www.dineout.co.in', 
        color: '#D32F2F',
        features: ['Table Booking', 'Restaurant Discovery', 'Offers & Deals']
      },
      { 
        name: 'EazyDiner', 
        url: 'https://www.eazydiner.com', 
        color: '#FF5722',
        features: ['Fine Dining', 'Reviews', 'Exclusive Deals']
      },
      { 
        name: 'OpenTable', 
        url: 'https://www.opentable.com', 
        color: '#DA3743',
        features: ['Global Reservations', 'Points Rewards', 'Special Events']
      }
    ]
  },
  {
    id: 'repair-services',
    name: 'Repair Services',
    icon: Wrench,
    priority: 27,
    platforms: [
      { 
        name: 'Mr. Right', 
        url: 'https://www.mrright.in', 
        color: '#FF6B35',
        features: ['Home Repairs', 'Appliance Service', 'Professional Technicians']
      },
      { 
        name: 'UrbanClap Repairs', 
        url: 'https://www.urbancompany.com/repairs', 
        color: '#6B46C1',
        features: ['Electronics Repair', 'Furniture Repair', 'Quick Service']
      },
      { 
        name: 'Sulekha Services', 
        url: 'https://www.sulekha.com', 
        color: '#FF9800',
        features: ['Local Services', 'Verified Professionals', 'Multiple Categories']
      }
    ]
  }
];

// Helper function to get high priority categories (top 6)
export const getHighPriorityCategories = () => {
  return categories
    .filter(cat => cat.priority && cat.priority <= 6)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0));
};

// Helper function to get remaining categories
export const getRemainingCategories = () => {
  return categories
    .filter(cat => !cat.priority || cat.priority > 6)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));
};