import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'food',
    name: 'Food Delivery',
    icon: '🍔',
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
  {
    id: 'grocery',
    name: 'Grocery',
    icon: '🛒',
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
  {
    id: 'travel',
    name: 'Travel Booking',
    icon: '✈️',
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
  {
    id: 'hotels',
    name: 'Hotels & Stays',
    icon: '🏨',
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
  {
    id: 'tickets',
    name: 'Tickets & Transport',
    icon: '🚆',
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
  }
];