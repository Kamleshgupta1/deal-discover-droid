import { Category } from '@/types';
import { 
  UtensilsCrossed, 
  ShoppingCart, 
  Plane, 
  Building2, 
  Ticket, 
  Fuel, 
  CreditCard, 
  Shirt, 
  Smartphone,
  LucideIcon
} from 'lucide-react';

export const categories: Category[] = [
  // Food Delivery
  {
    id: 'food',
    name: 'Food Delivery',
    icon: UtensilsCrossed,
    color: 'from-orange-500 to-red-500',
    description: 'Compare food delivery across Swiggy, Zomato, and more',
    platforms: [
      {
        id: 'swiggy',
        name: 'Swiggy',
        logo: '🛵',
        rating: 4.3,
        deliveryTime: '30-45 min',
        minOrder: 99,
        deliveryFee: 29,
        discounts: ['50% off on first order', 'Free delivery above ₹199'],
        deepLink: 'swiggy://restaurant',
        appLink: 'swiggy://restaurant',
        webLink: 'https://swiggy.com'
      },
      {
        id: 'zomato',
        name: 'Zomato',
        logo: '🍅',
        rating: 4.1,
        deliveryTime: '35-50 min',
        minOrder: 149,
        deliveryFee: 39,
        discounts: ['60% off up to ₹120', 'Zomato Gold benefits'],
        deepLink: 'zomato://restaurant',
        appLink: 'zomato://restaurant',
        webLink: 'https://zomato.com'
      },
      {
        id: 'ubereats',
        name: 'Uber Eats',
        logo: '🚗',
        rating: 4.0,
        deliveryTime: '25-40 min',
        minOrder: 99,
        deliveryFee: 19,
        discounts: ['Buy 1 Get 1 Free', 'Free delivery on Uber One'],
        deepLink: 'ubereats://restaurant',
        appLink: 'ubereats://restaurant',
        webLink: 'https://ubereats.com'
      }
    ]
  },
  
  // Grocery Delivery
  {
    id: 'grocery',
    name: 'Grocery',
    icon: ShoppingCart,
    color: 'from-green-500 to-emerald-500',
    description: 'Quick grocery delivery from Blinkit, Zepto, Instamart',
    platforms: [
      {
        id: 'blinkit',
        name: 'Blinkit',
        logo: '⚡',
        rating: 4.2,
        deliveryTime: '10-15 min',
        minOrder: 199,
        deliveryFee: 25,
        discounts: ['₹100 off on first order', 'Free delivery above ₹299'],
        deepLink: 'blinkit://products',
        appLink: 'blinkit://products',
        webLink: 'https://blinkit.com'
      },
      {
        id: 'zepto',
        name: 'Zepto',
        logo: '🔥',
        rating: 4.4,
        deliveryTime: '10 min',
        minOrder: 149,
        deliveryFee: 29,
        discounts: ['Save ₹150 on first order', 'Daily deals'],
        deepLink: 'zepto://products',
        appLink: 'zepto://products',
        webLink: 'https://zepto.com'
      },
      {
        id: 'instamart',
        name: 'Instamart',
        logo: '📦',
        rating: 4.1,
        deliveryTime: '15-30 min',
        minOrder: 99,
        deliveryFee: 19,
        discounts: ['40% off up to ₹80', 'Swiggy One benefits'],
        deepLink: 'swiggy://instamart',
        appLink: 'swiggy://instamart',
        webLink: 'https://swiggy.com/instamart'
      }
    ]
  },

  // Travel Booking
  {
    id: 'travel',
    name: 'Travel Booking',
    icon: Plane,
    color: 'from-blue-500 to-purple-500',
    description: 'Compare flights, hotels from MakeMyTrip, Goibibo, Cleartrip',
    platforms: [
      {
        id: 'makemytrip',
        name: 'MakeMyTrip',
        logo: '🧳',
        rating: 4.0,
        discounts: ['Up to ₹10,000 off on flights', 'Hotel bookings from ₹999'],
        deepLink: 'makemytrip://flights',
        appLink: 'makemytrip://flights',
        webLink: 'https://makemytrip.com'
      },
      {
        id: 'goibibo',
        name: 'Goibibo',
        logo: '🎒',
        rating: 4.2,
        discounts: ['Flat ₹3000 off on international flights', 'goCash+ rewards'],
        deepLink: 'goibibo://flights',
        appLink: 'goibibo://flights',
        webLink: 'https://goibibo.com'
      },
      {
        id: 'cleartrip',
        name: 'Cleartrip',
        logo: '🎫',
        rating: 4.1,
        discounts: ['Expressway to savings', 'No convenience fee'],
        deepLink: 'cleartrip://flights',
        appLink: 'cleartrip://flights',
        webLink: 'https://cleartrip.com'
      }
    ]
  },

  // Hotels & Stays
  {
    id: 'hotels',
    name: 'Hotels & Stays',
    icon: Building2,
    color: 'from-pink-500 to-rose-500',
    description: 'Book hotels, rooms with OYO, Treebo, FabHotels',
    platforms: [
      {
        id: 'oyo',
        name: 'OYO',
        logo: '🏠',
        rating: 3.8,
        discounts: ['Up to 50% off on bookings', 'OYO Money rewards'],
        deepLink: 'oyo://hotels',
        appLink: 'oyo://hotels',
        webLink: 'https://oyorooms.com'
      },
      {
        id: 'treebo',
        name: 'Treebo',
        logo: '🌳',
        rating: 4.0,
        discounts: ['Book 2 Nights, Pay for 1', 'TCommission rewards'],
        deepLink: 'treebo://hotels',
        appLink: 'treebo://hotels',
        webLink: 'https://treebo.com'
      },
      {
        id: 'fabhotels',
        name: 'FabHotels',
        logo: '⭐',
        rating: 4.1,
        discounts: ['Flat 25% off on weekend stays', 'FabCash rewards'],
        deepLink: 'fabhotels://hotels',
        appLink: 'fabhotels://hotels',
        webLink: 'https://fabhotels.com'
      }
    ]
  },

  // Tickets & Transport
  {
    id: 'tickets',
    name: 'Tickets & Transport',
    icon: Ticket,
    color: 'from-indigo-500 to-blue-500',
    description: 'Book train, bus, movie tickets from IRCTC, BookMyShow',
    platforms: [
      {
        id: 'irctc',
        name: 'IRCTC',
        logo: '🚄',
        rating: 3.9,
        discounts: ['Cashback on UPI payments', 'Senior citizen discounts'],
        deepLink: 'irctc://tickets',
        appLink: 'irctc://tickets',
        webLink: 'https://irctc.co.in'
      },
      {
        id: 'redbus',
        name: 'RedBus',
        logo: '🚌',
        rating: 4.2,
        discounts: ['Up to ₹300 off on bus bookings', 'Red Deals'],
        deepLink: 'redbus://buses',
        appLink: 'redbus://buses',
        webLink: 'https://redbus.in'
      },
      {
        id: 'bookmyshow',
        name: 'BookMyShow',
        logo: '🎬',
        rating: 4.3,
        discounts: ['Movie tickets from ₹99', 'Stream unlimited'],
        deepLink: 'bookmyshow://movies',
        appLink: 'bookmyshow://movies',
        webLink: 'https://bookmyshow.com'
      }
    ]
  },

  // Fuel Stations
  {
    id: 'fuel',
    name: 'Fuel Stations',
    icon: Fuel,
    color: 'from-yellow-500 to-orange-500',
    description: 'Compare fuel prices and offers from IOCL, HP, BPCL',
    platforms: [
      {
        id: 'iocl',
        name: 'Indian Oil',
        logo: '🛢️',
        rating: 4.1,
        discounts: ['IOCL loyalty points', 'Digital payment discounts'],
        deepLink: 'iocl://fuel',
        appLink: 'iocl://fuel',
        webLink: 'https://iocl.com'
      },
      {
        id: 'hp',
        name: 'HP',
        logo: '⚡',
        rating: 4.0,
        discounts: ['HP Pay rewards', 'Credit card offers'],
        deepLink: 'hp://fuel',
        appLink: 'hp://fuel',
        webLink: 'https://hindustanpetroleum.com'
      },
      {
        id: 'bpcl',
        name: 'BPCL',
        logo: '🔥',
        rating: 3.9,
        discounts: ['SmartDrive rewards', 'UPI cashback'],
        deepLink: 'bpcl://fuel',
        appLink: 'bpcl://fuel',
        webLink: 'https://bharatpetroleum.com'
      }
    ]
  },

  // Credit & Debit Cards
  {
    id: 'cards',
    name: 'Cards & Banking',
    icon: CreditCard,
    color: 'from-purple-500 to-blue-500',
    description: 'Compare credit cards, debit cards from banks',
    platforms: [
      {
        id: 'hdfc',
        name: 'HDFC Bank',
        logo: '🏦',
        rating: 4.3,
        discounts: ['Cashback on online purchases', 'Travel rewards'],
        deepLink: 'hdfc://cards',
        appLink: 'hdfc://cards',
        webLink: 'https://hdfcbank.com'
      },
      {
        id: 'icici',
        name: 'ICICI Bank',
        logo: '💰',
        rating: 4.2,
        discounts: ['Reward points on every purchase', 'Fuel surcharge waiver'],
        deepLink: 'icici://cards',
        appLink: 'icici://cards',
        webLink: 'https://icicibank.com'
      },
      {
        id: 'sbi',
        name: 'SBI',
        logo: '🏛️',
        rating: 4.0,
        discounts: ['Low annual fees', 'EMI conversion facility'],
        deepLink: 'sbi://cards',
        appLink: 'sbi://cards',
        webLink: 'https://sbi.co.in'
      }
    ]
  },

  // Clothing & Fashion
  {
    id: 'clothes',
    name: 'Clothing & Fashion',
    icon: Shirt,
    color: 'from-pink-500 to-purple-500',
    description: 'Shop fashion from Myntra, Ajio, Flipkart Fashion',
    platforms: [
      {
        id: 'myntra',
        name: 'Myntra',
        logo: '👗',
        rating: 4.4,
        deliveryTime: '2-5 days',
        discounts: ['End of season sale up to 70%', 'Free delivery above ₹799'],
        deepLink: 'myntra://fashion',
        appLink: 'myntra://fashion',
        webLink: 'https://myntra.com'
      },
      {
        id: 'ajio',
        name: 'Ajio',
        logo: '👖',
        rating: 4.2,
        deliveryTime: '3-7 days',
        discounts: ['Buy 2 Get 1 Free', 'Extra 20% off on app'],
        deepLink: 'ajio://fashion',
        appLink: 'ajio://fashion',
        webLink: 'https://ajio.com'
      },
      {
        id: 'flipkart-fashion',
        name: 'Flipkart Fashion',
        logo: '👚',
        rating: 4.1,
        deliveryTime: '2-4 days',
        discounts: ['Fashion days sale', 'Flipkart Plus benefits'],
        deepLink: 'flipkart://fashion',
        appLink: 'flipkart://fashion',
        webLink: 'https://flipkart.com/clothing'
      },
      {
        id: 'meesho',
        name: 'Meesho',
        logo: '🛍️',
        rating: 4.0,
        deliveryTime: '5-7 days',
        discounts: ['Lowest prices guaranteed', 'Free delivery'],
        deepLink: 'meesho://fashion',
        appLink: 'meesho://fashion',
        webLink: 'https://meesho.com'
      }
    ]
  },

  // Electronics & Gadgets
  {
    id: 'electronics',
    name: 'Electronics & Gadgets',
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
    description: 'Compare electronics from Amazon, Flipkart, Croma',
    platforms: [
      {
        id: 'amazon',
        name: 'Amazon',
        logo: '📦',
        rating: 4.5,
        deliveryTime: '1-2 days',
        discounts: ['Great Indian Festival', 'Prime member benefits'],
        deepLink: 'amazon://electronics',
        appLink: 'amazon://electronics',
        webLink: 'https://amazon.in'
      },
      {
        id: 'flipkart',
        name: 'Flipkart',
        logo: '🛒',
        rating: 4.3,
        deliveryTime: '2-4 days',
        discounts: ['Big Billion Days', 'Flipkart Plus benefits'],
        deepLink: 'flipkart://electronics',
        appLink: 'flipkart://electronics',
        webLink: 'https://flipkart.com'
      },
      {
        id: 'croma',
        name: 'Croma',
        logo: '💻',
        rating: 4.1,
        deliveryTime: '3-5 days',
        discounts: ['Store pickup discounts', 'Extended warranty'],
        deepLink: 'croma://electronics',
        appLink: 'croma://electronics',
        webLink: 'https://croma.com'
      },
      {
        id: 'vijaysales',
        name: 'Vijay Sales',
        logo: '📺',
        rating: 4.0,
        deliveryTime: '3-7 days',
        discounts: ['Festival offers', 'Exchange benefits'],
        deepLink: 'vijaysales://electronics',
        appLink: 'vijaysales://electronics',
        webLink: 'https://vijaysales.com'
      }
    ]
  }
];