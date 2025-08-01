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
  Home
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