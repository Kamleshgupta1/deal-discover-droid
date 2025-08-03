import { Film, BookOpen, TrendingUp, UtensilsCrossed, Car, Pill, Smartphone, 
         Laptop, Gamepad2, Home, Plane, CreditCard, PiggyBank, Shield, 
         ShoppingCart, Dumbbell, GraduationCap, Briefcase, MapPin, Stethoscope, 
         Building, Coffee, Baby, Gift, Music, Newspaper, Cloud } from 'lucide-react';
import { Category } from '@/types';

export const getAllCategories = (): Category[] => [
  // High Priority Categories (shown on home)
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: Film,
    hasRealApi: true,
    platforms: [
      { name: 'Netflix', url: 'https://netflix.com', color: '#e50914', features: ['Streaming', 'HD Quality'] },
      { name: 'Amazon Prime', url: 'https://primevideo.com', color: '#00a8e1', features: ['Prime Video', 'Free Delivery'] },
      { name: 'Disney+ Hotstar', url: 'https://hotstar.com', color: '#0f1419', features: ['Disney Content', 'Sports'] }
    ],
    description: 'Compare movies, TV shows, and streaming services',
    keywords: ['movie', 'film', 'show', 'netflix', 'streaming']
  },
  {
    id: 'books',
    name: 'Books',
    icon: BookOpen,
    hasRealApi: true,
    platforms: [
      { name: 'Amazon Kindle', url: 'https://kindle.amazon.com', color: '#ff9900', features: ['Digital', 'Cloud Sync'] },
      { name: 'Google Books', url: 'https://books.google.com', color: '#4285f4', features: ['Free Preview', 'Sample Pages'] },
      { name: 'Apple Books', url: 'https://books.apple.com', color: '#007aff', features: ['iOS Integration', 'Audiobooks'] }
    ],
    description: 'Find and compare books across platforms',
    keywords: ['book', 'ebook', 'novel', 'reading', 'kindle']
  },
  {
    id: 'cryptocurrency',
    name: 'Cryptocurrency',
    icon: TrendingUp,
    hasRealApi: true,
    platforms: [
      { name: 'Binance', url: 'https://binance.com', color: '#f7931a', features: ['Trading', 'Secure'] },
      { name: 'Coinbase', url: 'https://coinbase.com', color: '#0052ff', features: ['Easy to Use', 'Regulated'] },
      { name: 'Kraken', url: 'https://kraken.com', color: '#5741d9', features: ['Advanced Trading', 'Security'] }
    ],
    description: 'Compare crypto prices and exchanges',
    keywords: ['crypto', 'bitcoin', 'ethereum', 'trading', 'exchange']
  },
  {
    id: 'food',
    name: 'Food & Recipes',
    icon: UtensilsCrossed,
    hasRealApi: true,
    platforms: [
      { name: 'TheMealDB', url: 'https://themealdb.com', color: '#ff6b6b', features: ['Free Recipe', 'Video Tutorial'] },
      { name: 'Recipe Sites', url: 'https://allrecipes.com', color: '#ff9500', features: ['User Reviews', 'Step by Step'] },
      { name: 'Cooking Videos', url: 'https://youtube.com/cooking', color: '#ff0000', features: ['Video Tutorials', 'Chef Tips'] }
    ],
    description: 'Find recipes and cooking tutorials',
    keywords: ['recipe', 'cooking', 'food', 'meal', 'ingredients']
  },
  {
    id: 'ride-booking',
    name: 'Ride Booking',
    icon: Car,
    hasRealApi: false,
    platforms: [
      { name: 'Uber', url: 'https://uber.com', color: '#000000', features: ['Global Service', 'Multiple Options'] },
      { name: 'Lyft', url: 'https://lyft.com', color: '#ff00bf', features: ['Ride Sharing', 'Safety Features'] },
      { name: 'Ola', url: 'https://olacabs.com', color: '#00d100', features: ['Local Focus', 'Auto Rickshaw'] }
    ],
    description: 'Compare ride-sharing services and prices',
    keywords: ['uber', 'taxi', 'ride', 'cab', 'transport']
  },
  {
    id: 'medicine',
    name: 'Medicine',
    icon: Pill,
    hasRealApi: false,
    platforms: [
      { name: 'CVS', url: 'https://cvs.com', color: '#cc0000', features: ['Pharmacy Services', 'Health Products'] },
      { name: 'Walgreens', url: 'https://walgreens.com', color: '#e31837', features: ['Prescription Upload', 'Health Records'] },
      { name: 'Amazon Pharmacy', url: 'https://pharmacy.amazon.com', color: '#ff9900', features: ['Prime Benefits', 'Quick Delivery'] }
    ],
    description: 'Compare medicine prices and pharmacy services',
    keywords: ['medicine', 'pharmacy', 'drug', 'prescription', 'health']
  },
  {
    id: 'news',
    name: 'News',
    icon: Newspaper,
    hasRealApi: true,
    platforms: [
      { name: 'BBC', url: 'https://bbc.com', color: '#bb1919', features: ['Breaking News', 'Global Coverage'] },
      { name: 'CNN', url: 'https://cnn.com', color: '#c8102e', features: ['Live Updates', 'Analysis'] },
      { name: 'Reuters', url: 'https://reuters.com', color: '#ff6d00', features: ['Factual Reporting', 'Business News'] },
      { name: 'AP News', url: 'https://apnews.com', color: '#c8102e', features: ['Wire Service', 'Verified News'] }
    ],
    description: 'Get latest news from multiple sources',
    keywords: ['news', 'headlines', 'breaking', 'current events']
  },
  {
    id: 'weather',
    name: 'Weather',
    icon: Cloud,
    hasRealApi: true,
    platforms: [
      { name: 'WeatherAPI', url: 'https://weatherapi.com', color: '#87ceeb', features: ['Current Weather', '3-Day Forecast'] },
      { name: 'OpenWeather', url: 'https://openweathermap.org', color: '#eb6e4b', features: ['Global Coverage', 'Historical Data'] },
      { name: 'AccuWeather', url: 'https://accuweather.com', color: '#ef6c00', features: ['Precise Forecasts', 'Weather Alerts'] }
    ],
    description: 'Compare weather forecasts and conditions',
    keywords: ['weather', 'forecast', 'temperature', 'climate']
  },

  // Other Categories (shown on "See More")
  {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingCart,
    hasRealApi: false,
    platforms: [
      { name: 'Amazon', url: 'https://amazon.com', color: '#ff9900', features: ['Prime Delivery', 'Vast Selection'] },
      { name: 'eBay', url: 'https://ebay.com', color: '#e53238', features: ['Auctions', 'Global Marketplace'] },
      { name: 'Walmart', url: 'https://walmart.com', color: '#0071ce', features: ['Everyday Low Prices', 'Store Pickup'] }
    ],
    description: 'Compare shopping deals and prices',
    keywords: ['shopping', 'deals', 'products', 'amazon', 'ebay']
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: Plane,
    hasRealApi: false,
    platforms: [
      { name: 'Expedia', url: 'https://expedia.com', color: '#ffc72c', features: ['Flight Booking', 'Hotel Deals'] },
      { name: 'Booking.com', url: 'https://booking.com', color: '#003580', features: ['Free Cancellation', 'Best Price Guarantee'] },
      { name: 'Kayak', url: 'https://kayak.com', color: '#ff690f', features: ['Price Comparison', 'Flexible Dates'] }
    ],
    description: 'Compare travel deals and bookings',
    keywords: ['travel', 'flight', 'hotel', 'vacation', 'booking']
  },
  {
    id: 'banking',
    name: 'Banking',
    icon: CreditCard,
    hasRealApi: false,
    platforms: [
      { name: 'Chase', url: 'https://chase.com', color: '#0066b2', features: ['Credit Cards', 'Checking Accounts'] },
      { name: 'Bank of America', url: 'https://bankofamerica.com', color: '#e31837', features: ['Mobile Banking', 'Investment Services'] },
      { name: 'Wells Fargo', url: 'https://wellsfargo.com', color: '#d71921', features: ['Personal Banking', 'Mortgages'] }
    ],
    description: 'Compare banking services and rates',
    keywords: ['banking', 'credit card', 'loan', 'mortgage', 'savings']
  },
  {
    id: 'financial',
    name: 'Financial Services',
    icon: PiggyBank,
    hasRealApi: false,
    platforms: [
      { name: 'Robinhood', url: 'https://robinhood.com', color: '#00c805', features: ['Commission-Free Trading', 'Crypto Trading'] },
      { name: 'E*TRADE', url: 'https://etrade.com', color: '#7b68ee', features: ['Research Tools', 'Investment Options'] },
      { name: 'TD Ameritrade', url: 'https://tdameritrade.com', color: '#00a651', features: ['Professional Tools', 'Education'] }
    ],
    description: 'Compare investment and financial services',
    keywords: ['investing', 'stocks', 'financial', 'trading', 'retirement']
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    icon: TrendingUp,
    hasRealApi: false,
    platforms: [
      { name: 'Vanguard', url: 'https://vanguard.com', color: '#8b1538', features: ['Low-Cost Funds', 'Index Investing'] },
      { name: 'Fidelity', url: 'https://fidelity.com', color: '#00a651', features: ['Zero-Fee Funds', 'Research Tools'] },
      { name: 'Schwab', url: 'https://schwab.com', color: '#00a0df', features: ['No Minimum Investment', 'Advisory Services'] }
    ],
    description: 'Compare mutual fund options and fees',
    keywords: ['mutual funds', 'investing', 'portfolio', 'returns', 'fees']
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: Shield,
    hasRealApi: false,
    platforms: [
      { name: 'GEICO', url: 'https://geico.com', color: '#004890', features: ['Auto Insurance', 'Competitive Rates'] },
      { name: 'State Farm', url: 'https://statefarm.com', color: '#da020e', features: ['Personal Insurance', 'Local Agents'] },
      { name: 'Progressive', url: 'https://progressive.com', color: '#0066cc', features: ['Compare Rates', 'Bundling Discounts'] }
    ],
    description: 'Compare insurance policies and rates',
    keywords: ['insurance', 'auto', 'home', 'life', 'health', 'coverage']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    hasRealApi: false,
    platforms: [
      { name: 'Best Buy', url: 'https://bestbuy.com', color: '#0046be', features: ['Latest Tech', 'Expert Support'] },
      { name: 'Newegg', url: 'https://newegg.com', color: '#ff6900', features: ['PC Components', 'Tech Deals'] },
      { name: 'B&H', url: 'https://bhphotovideo.com', color: '#ff6900', features: ['Professional Equipment', 'Photography Gear'] }
    ],
    description: 'Compare electronics and tech products',
    keywords: ['electronics', 'tech', 'gadgets', 'computers', 'phones']
  },
  {
    id: 'computers',
    name: 'Computers',
    icon: Laptop,
    hasRealApi: false,
    platforms: [
      { name: 'Dell', url: 'https://dell.com', color: '#007db8', features: ['Custom Builds', 'Business Solutions'] },
      { name: 'HP', url: 'https://hp.com', color: '#0073e6', features: ['Reliable Hardware', 'Support Services'] },
      { name: 'Lenovo', url: 'https://lenovo.com', color: '#e2231a', features: ['ThinkPad Series', 'Gaming Laptops'] }
    ],
    description: 'Compare computer brands and specs',
    keywords: ['computers', 'laptops', 'desktops', 'pc', 'specs']
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    hasRealApi: false,
    platforms: [
      { name: 'Steam', url: 'https://steampowered.com', color: '#1b2838', features: ['PC Gaming', 'Digital Library'] },
      { name: 'PlayStation', url: 'https://playstation.com', color: '#003087', features: ['Exclusive Games', 'Online Gaming'] },
      { name: 'Xbox', url: 'https://xbox.com', color: '#107c10', features: ['Game Pass', 'Cloud Gaming'] }
    ],
    description: 'Compare gaming platforms and deals',
    keywords: ['gaming', 'games', 'console', 'pc gaming', 'steam']
  },
  {
    id: 'home',
    name: 'Home & Garden',
    icon: Home,
    hasRealApi: false,
    platforms: [
      { name: 'Home Depot', url: 'https://homedepot.com', color: '#f96302', features: ['Home Improvement', 'Tool Rental'] },
      { name: 'Lowes', url: 'https://lowes.com', color: '#0067b1', features: ['Installation Services', 'Project Ideas'] },
      { name: 'IKEA', url: 'https://ikea.com', color: '#0058a3', features: ['Furniture Design', 'Assembly Service'] }
    ],
    description: 'Compare home improvement and furniture',
    keywords: ['home', 'furniture', 'garden', 'tools', 'improvement']
  },
  {
    id: 'fitness',
    name: 'Fitness',
    icon: Dumbbell,
    hasRealApi: false,
    platforms: [
      { name: 'Planet Fitness', url: 'https://planetfitness.com', color: '#7b2d8e', features: ['Affordable Membership', 'Judgment Free Zone'] },
      { name: 'LA Fitness', url: 'https://lafitness.com', color: '#c8102e', features: ['Full-Service Gym', 'Group Classes'] },
      { name: 'Anytime Fitness', url: 'https://anytimefitness.com', color: '#7b2d8e', features: ['24/7 Access', 'Personal Training'] }
    ],
    description: 'Compare fitness centers and memberships',
    keywords: ['fitness', 'gym', 'workout', 'health', 'exercise']
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    hasRealApi: false,
    platforms: [
      { name: 'Coursera', url: 'https://coursera.org', color: '#0056d3', features: ['University Courses', 'Certificates'] },
      { name: 'Udemy', url: 'https://udemy.com', color: '#a435f0', features: ['Practical Skills', 'Lifetime Access'] },
      { name: 'Khan Academy', url: 'https://khanacademy.org', color: '#14bf96', features: ['Free Education', 'Personalized Learning'] }
    ],
    description: 'Compare online learning platforms',
    keywords: ['education', 'learning', 'courses', 'skills', 'certification']
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: Briefcase,
    hasRealApi: false,
    platforms: [
      { name: 'LinkedIn', url: 'https://linkedin.com', color: '#0077b5', features: ['Professional Network', 'Job Search'] },
      { name: 'Indeed', url: 'https://indeed.com', color: '#2557a7', features: ['Job Aggregator', 'Company Reviews'] },
      { name: 'Glassdoor', url: 'https://glassdoor.com', color: '#0caa41', features: ['Salary Insights', 'Company Culture'] }
    ],
    description: 'Compare job search platforms',
    keywords: ['jobs', 'career', 'employment', 'resume', 'hiring']
  },
  {
    id: 'local',
    name: 'Local Services',
    icon: MapPin,
    hasRealApi: false,
    platforms: [
      { name: 'Yelp', url: 'https://yelp.com', color: '#d32323', features: ['Local Reviews', 'Business Discovery'] },
      { name: 'Google Maps', url: 'https://maps.google.com', color: '#4285f4', features: ['Navigation', 'Business Hours'] },
      { name: 'Foursquare', url: 'https://foursquare.com', color: '#f94877', features: ['Location Intelligence', 'Check-ins'] }
    ],
    description: 'Find and compare local services',
    keywords: ['local', 'services', 'reviews', 'nearby', 'businesses']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Stethoscope,
    hasRealApi: false,
    platforms: [
      { name: 'Teladoc', url: 'https://teladoc.com', color: '#6c5ce7', features: ['Virtual Consultations', 'Medical Expertise'] },
      { name: 'MDLive', url: 'https://mdlive.com', color: '#00b894', features: ['24/7 Access', 'Prescription Services'] },
      { name: 'Doctor on Demand', url: 'https://doctorondemand.com', color: '#0984e3', features: ['Video Visits', 'Mental Health'] }
    ],
    description: 'Compare healthcare and telemedicine services',
    keywords: ['healthcare', 'doctor', 'medical', 'telemedicine', 'health']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Building,
    hasRealApi: false,
    platforms: [
      { name: 'Zillow', url: 'https://zillow.com', color: '#006aff', features: ['Home Values', 'Market Trends'] },
      { name: 'Realtor.com', url: 'https://realtor.com', color: '#d92228', features: ['MLS Listings', 'Agent Directory'] },
      { name: 'Redfin', url: 'https://redfin.com', color: '#a02021', features: ['Low Commission', 'Market Insights'] }
    ],
    description: 'Compare real estate platforms and listings',
    keywords: ['real estate', 'homes', 'property', 'buying', 'selling']
  },
  {
    id: 'coffee',
    name: 'Coffee',
    icon: Coffee,
    hasRealApi: false,
    platforms: [
      { name: 'Starbucks', url: 'https://starbucks.com', color: '#00704a', features: ['Global Presence', 'Rewards Program'] },
      { name: 'Blue Bottle', url: 'https://bluebottlecoffee.com', color: '#1e3a8a', features: ['Artisan Coffee', 'Subscription Service'] },
      { name: 'Dunkin', url: 'https://dunkindonuts.com', color: '#ff6600', features: ['Fast Service', 'Mobile Ordering'] }
    ],
    description: 'Compare coffee shops and subscriptions',
    keywords: ['coffee', 'cafe', 'espresso', 'beans', 'subscription']
  },
  {
    id: 'baby',
    name: 'Baby & Kids',
    icon: Baby,
    hasRealApi: false,
    platforms: [
      { name: 'Buy Buy Baby', url: 'https://buybuybaby.com', color: '#0066cc', features: ['Baby Gear', 'Registry Services'] },
      { name: 'Target Baby', url: 'https://target.com/c/baby', color: '#cc0000', features: ['Affordable Options', 'Subscription Boxes'] },
      { name: 'Amazon Baby', url: 'https://amazon.com/baby', color: '#ff9900', features: ['Wide Selection', 'Subscribe & Save'] }
    ],
    description: 'Compare baby and kids products',
    keywords: ['baby', 'kids', 'children', 'toys', 'gear']
  },
  {
    id: 'gifts',
    name: 'Gifts',
    icon: Gift,
    hasRealApi: false,
    platforms: [
      { name: 'Amazon Gifts', url: 'https://amazon.com/gifts', color: '#ff9900', features: ['Gift Cards', 'Wish Lists'] },
      { name: 'Etsy', url: 'https://etsy.com', color: '#f16521', features: ['Handmade Items', 'Personalized Gifts'] },
      { name: 'Uncommon Goods', url: 'https://uncommongoods.com', color: '#8b5a3c', features: ['Unique Gifts', 'Artisan Made'] }
    ],
    description: 'Find and compare gift ideas',
    keywords: ['gifts', 'presents', 'occasions', 'personalized', 'unique']
  },
  {
    id: 'music',
    name: 'Music',
    icon: Music,
    hasRealApi: false,
    platforms: [
      { name: 'Spotify', url: 'https://spotify.com', color: '#1db954', features: ['Music Streaming', 'Playlists'] },
      { name: 'Apple Music', url: 'https://music.apple.com', color: '#fc3c44', features: ['High Quality Audio', 'Exclusive Content'] },
      { name: 'YouTube Music', url: 'https://music.youtube.com', color: '#ff0000', features: ['Music Videos', 'Free Tier'] }
    ],
    description: 'Compare music streaming services',
    keywords: ['music', 'streaming', 'songs', 'playlist', 'audio']
  }
];

export const getHighPriorityCategories = (): Category[] => {
  return getAllCategories().slice(0, 6);
};

export const getRemainingCategories = (): Category[] => {
  return getAllCategories().slice(6);
};
