import { Film, BookOpen, TrendingUp, UtensilsCrossed, Car, Pill, Smartphone, 
         Laptop, Gamepad2, Home, Plane, CreditCard, PiggyBank, Shield, 
         ShoppingCart, Dumbbell, GraduationCap, Briefcase, MapPin, Stethoscope, 
         Building, Coffee, Baby, Gift, Music, Newspaper, Cloud, Fuel, 
         Zap, Battery, Heart, DollarSign, Banknote, Truck, Monitor, 
         Refrigerator, Package, ShirtIcon as Shirt, Camera, Tv, Headphones,
         Calculator, Wrench, Paintbrush, BarChart3, Globe, Users2, Landmark } from 'lucide-react';
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
  
  // New Categories - Vehicles
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: Truck,
    hasRealApi: false,
    platforms: [
      { name: 'Royal Enfield', url: 'https://royalenfield.com', color: '#000000', features: ['Classic Bikes', 'Premium Quality'] },
      { name: 'Honda', url: 'https://honda.com', color: '#cc0000', features: ['Reliable Vehicles', 'Global Brand'] },
      { name: 'Tata Motors', url: 'https://tata.com', color: '#1f4788', features: ['Commercial Vehicles', 'Electric Cars'] },
      { name: 'Ather Energy', url: 'https://atherenergy.com', color: '#00d4aa', features: ['Electric Scooters', 'Smart Features'] }
    ],
    description: 'Compare bikes, scooters, cars, trucks and electric vehicles',
    keywords: ['vehicle', 'bike', 'scooter', 'car', 'truck', 'electric', 'two wheeler', 'four wheeler']
  },
  {
    id: 'mobile-devices',
    name: 'Mobile Devices',
    icon: Smartphone,
    hasRealApi: false,
    platforms: [
      { name: 'Apple', url: 'https://apple.com', color: '#007aff', features: ['iPhone', 'Premium Build'] },
      { name: 'Samsung', url: 'https://samsung.com', color: '#1f4788', features: ['Galaxy Series', 'Android'] },
      { name: 'OnePlus', url: 'https://oneplus.com', color: '#eb0029', features: ['Flagship Killer', 'OxygenOS'] },
      { name: 'Xiaomi', url: 'https://xiaomi.com', color: '#ff6900', features: ['Value for Money', 'MIUI'] }
    ],
    description: 'Compare smartphones, tablets and mobile accessories',
    keywords: ['mobile', 'smartphone', 'phone', 'tablet', 'iphone', 'android']
  },
  {
    id: 'computers-laptops',
    name: 'Computers & Laptops',
    icon: Laptop,
    hasRealApi: false,
    platforms: [
      { name: 'Apple', url: 'https://apple.com', color: '#007aff', features: ['MacBook', 'macOS'] },
      { name: 'Dell', url: 'https://dell.com', color: '#007db8', features: ['XPS Series', 'Business Laptops'] },
      { name: 'HP', url: 'https://hp.com', color: '#0073e6', features: ['Pavilion Series', 'Enterprise Solutions'] },
      { name: 'Lenovo', url: 'https://lenovo.com', color: '#e2231a', features: ['ThinkPad', 'Gaming Laptops'] }
    ],
    description: 'Compare laptops, desktops, and computer components',
    keywords: ['laptop', 'computer', 'desktop', 'pc', 'macbook', 'gaming pc']
  },
  {
    id: 'home-appliances',
    name: 'Home Appliances',
    icon: Refrigerator,
    hasRealApi: false,
    platforms: [
      { name: 'LG', url: 'https://lg.com', color: '#a50034', features: ['Smart Appliances', 'Energy Efficient'] },
      { name: 'Samsung', url: 'https://samsung.com', color: '#1f4788', features: ['Digital Inverter', 'Connected Home'] },
      { name: 'Whirlpool', url: 'https://whirlpool.com', color: '#004c97', features: ['Reliable Quality', 'Innovation'] },
      { name: 'Godrej', url: 'https://godrej.com', color: '#00a651', features: ['Indian Brand', 'Affordable'] }
    ],
    description: 'Compare refrigerators, washing machines, ACs, and other appliances',
    keywords: ['appliance', 'refrigerator', 'fridge', 'washing machine', 'ac', 'air conditioner', 'microwave']
  },
  {
    id: 'home-products',
    name: 'Home & Kitchen Products',
    icon: Package,
    hasRealApi: false,
    platforms: [
      { name: 'Amazon', url: 'https://amazon.com', color: '#ff9900', features: ['Wide Selection', 'Fast Delivery'] },
      { name: 'Flipkart', url: 'https://flipkart.com', color: '#2874f0', features: ['Big Billion Days', 'Local Brand'] },
      { name: 'Pepperfry', url: 'https://pepperfry.com', color: '#f57224', features: ['Furniture Specialist', 'Home Decor'] },
      { name: 'Urban Ladder', url: 'https://urbanladder.com', color: '#f26522', features: ['Premium Furniture', 'Design Focus'] }
    ],
    description: 'Compare home decor, kitchen items, furniture and household products',
    keywords: ['home', 'kitchen', 'furniture', 'decor', 'household', 'cookware', 'storage']
  },
  {
    id: 'food',
    name: 'Food & Recipes',
    icon: UtensilsCrossed,
    hasRealApi: true,
    platforms: [
      { name: 'TheMealDB', url: 'https://themealdb.com', color: '#ff6b6b', features: ['Free Recipe', 'Video Tutorial'] },
      { name: 'Allrecipes', url: 'https://allrecipes.com', color: '#ff9500', features: ['User Reviews', 'Step by Step'] },
      { name: 'Food Network', url: 'https://foodnetwork.com', color: '#ff0000', features: ['Chef Recipes', 'Cooking Shows'] },
      { name: 'Tasty', url: 'https://tasty.co', color: '#ee4622', features: ['Quick Recipes', 'Video Guides'] }
    ],
    description: 'Discover delicious recipes and cooking tutorials from top chefs',
    keywords: ['recipe', 'cooking', 'food', 'meal', 'ingredients', 'chef', 'cuisine']
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
    id: 'grocery',
    name: 'Grocery',
    icon: ShoppingCart,
    hasRealApi: true,
    platforms: [
      { name: 'BigBasket', url: 'https://bigbasket.com', color: '#84c440', features: ['Fresh Produce', 'Same Day Delivery'] },
      { name: 'Grofers', url: 'https://blinkit.com', color: '#fcbf04', features: ['10 Min Delivery', 'Fresh Fruits'] },
      { name: 'Amazon Fresh', url: 'https://amazon.in/fresh', color: '#ff9900', features: ['Prime Benefits', 'Fresh Guarantee'] },
      { name: 'Swiggy Instamart', url: 'https://swiggy.com/instamart', color: '#fc8019', features: ['Ultra Fast Delivery', 'Express Lane'] }
    ],
    description: 'Compare grocery prices and delivery times across all major platforms',
    keywords: ['grocery', 'vegetables', 'fruits', 'milk', 'bread', 'food items', 'fresh produce']
  },
  {
    id: 'clothing',
    name: 'Clothing & Fashion',
    icon: ShoppingCart,
    hasRealApi: true,
    platforms: [
      { name: 'Myntra', url: 'https://myntra.com', color: '#ff3f6c', features: ['Fashion Forward', 'Easy Returns'] },
      { name: 'Amazon Fashion', url: 'https://amazon.in/fashion', color: '#ff9900', features: ['Prime Delivery', 'Try Before Buy'] },
      { name: 'Flipkart Fashion', url: 'https://flipkart.com/clothing', color: '#2874f0', features: ['Big Billion Days', 'Plus Exclusive'] },
      { name: 'Ajio', url: 'https://ajio.com', color: '#c8a86d', features: ['Curated Fashion', 'Exclusive Brands'] }
    ],
    description: 'Find the best deals on clothing, shoes, and fashion accessories',
    keywords: ['clothing', 'fashion', 'shirt', 'dress', 'jeans', 'shoes', 'accessories', 'apparel']
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingCart,
    hasRealApi: true,
    platforms: [
      { name: 'Amazon', url: 'https://amazon.com', color: '#ff9900', features: ['Prime Delivery', 'Vast Selection'] },
      { name: 'eBay', url: 'https://ebay.com', color: '#e53238', features: ['Auctions', 'Global Marketplace'] },
      { name: 'Walmart', url: 'https://walmart.com', color: '#0071ce', features: ['Everyday Low Prices', 'Store Pickup'] },
      { name: 'Target', url: 'https://target.com', color: '#cc0000', features: ['Trendy Products', 'Same Day Delivery'] },
      { name: 'Best Buy', url: 'https://bestbuy.com', color: '#0046be', features: ['Electronics', 'Expert Support'] },
      { name: 'Costco', url: 'https://costco.com', color: '#ee2e32', features: ['Bulk Shopping', 'Member Prices'] }
    ],
    description: 'Find the best deals across all major shopping platforms',
    keywords: ['shopping', 'deals', 'products', 'amazon', 'ebay', 'mobile', 'laptop', 'electronics', 'clothing', 'home']
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: Plane,
    hasRealApi: true,
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
    hasRealApi: true,
    platforms: [
      { name: 'Best Buy', url: 'https://bestbuy.com', color: '#0046be', features: ['Latest Tech', 'Expert Support'] },
      { name: 'Amazon Electronics', url: 'https://amazon.com/electronics', color: '#ff9900', features: ['Fast Delivery', 'Reviews'] },
      { name: 'Newegg', url: 'https://newegg.com', color: '#ff6900', features: ['PC Components', 'Tech Deals'] },
      { name: 'B&H Photo', url: 'https://bhphotovideo.com', color: '#ff6900', features: ['Professional Equipment', 'Photography Gear'] },
      { name: 'Micro Center', url: 'https://microcenter.com', color: '#ff6900', features: ['In-Store Pickup', 'Tech Support'] }
    ],
    description: 'Find the best deals on smartphones, laptops, and all tech gadgets',
    keywords: ['electronics', 'tech', 'gadgets', 'computers', 'phones', 'smartphone', 'laptop', 'tablet', 'camera', 'mobile']
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
    hasRealApi: true,
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
  },
  {
    id: 'fuel',
    name: 'Fuel Prices',
    icon: Fuel,
    hasRealApi: true,
    platforms: [
      { name: 'Indian Oil', url: 'https://iocl.com', color: '#ff6b35', features: ['Daily Updates', 'All Fuel Types'] },
      { name: 'Bharat Petroleum', url: 'https://bharatpetroleum.in', color: '#0066cc', features: ['Competitive Prices', 'Quality Fuel'] },
      { name: 'Hindustan Petroleum', url: 'https://hindustanpetroleum.com', color: '#ff3366', features: ['Premium Quality', 'Wide Network'] },
      { name: 'Reliance', url: 'https://ril.com', color: '#005580', features: ['Modern Stations', 'Digital Payments'] }
    ],
    description: 'Compare fuel prices across different providers and locations',
    keywords: ['fuel', 'petrol', 'diesel', 'cng', 'lpg', 'gas', 'price']
  },
  {
    id: 'gas',
    name: 'Gas Connections',
    icon: Zap,
    hasRealApi: true,
    platforms: [
      { name: 'Indane Gas', url: 'https://indane.co.in', color: '#ff6b35', features: ['Subsidized Rates', 'Home Delivery'] },
      { name: 'Bharat Gas', url: 'https://bharatgas.com', color: '#0066cc', features: ['Quick Service', 'Safety Features'] },
      { name: 'HP Gas', url: 'https://hpgas.in', color: '#ff3366', features: ['Online Booking', 'Reliable Supply'] },
      { name: 'Reliance Gas', url: 'https://reliancegas.com', color: '#005580', features: ['Premium Service', 'Digital Platform'] }
    ],
    description: 'Compare commercial and domestic gas connections and prices',
    keywords: ['gas', 'lpg', 'commercial', 'domestic', 'connection', 'cylinder']
  },
  {
    id: 'recharge',
    name: 'Mobile & DTH Recharge',
    icon: Battery,
    hasRealApi: true,
    platforms: [
      { name: 'Paytm', url: 'https://paytm.com', color: '#002970', features: ['5% Cashback', 'Instant Recharge'] },
      { name: 'PhonePe', url: 'https://phonepe.com', color: '#5f259f', features: ['UPI Payments', 'Rewards'] },
      { name: 'Google Pay', url: 'https://pay.google.com', color: '#4285f4', features: ['Secure Payments', 'Offers'] },
      { name: 'Amazon Pay', url: 'https://amazon.in/pay', color: '#ff9900', features: ['Prime Benefits', 'Cashback'] }
    ],
    description: 'Compare recharge options for mobile, DTH, electricity and broadband',
    keywords: ['recharge', 'mobile', 'dth', 'electricity', 'broadband', 'prepaid', 'postpaid']
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    icon: TrendingUp,
    hasRealApi: true,
    platforms: [
      { name: 'SBI Mutual Fund', url: 'https://sbimf.com', color: '#0066cc', features: ['Low Expense Ratio', 'Diversified Portfolio'] },
      { name: 'HDFC Mutual Fund', url: 'https://hdfcfund.com', color: '#004c8c', features: ['Top Performance', 'Professional Management'] },
      { name: 'ICICI Prudential', url: 'https://icicipruamc.com', color: '#b30000', features: ['Systematic Plans', 'Risk Management'] },
      { name: 'Axis Mutual Fund', url: 'https://axismf.com', color: '#800080', features: ['Growth Funds', 'Regular Income'] }
    ],
    description: 'Compare mutual fund options, returns, and investment plans',
    keywords: ['mutual funds', 'sip', 'investment', 'returns', 'portfolio', 'equity', 'debt']
  },
  {
    id: 'insurance',
    name: 'Insurance Policies',
    icon: Shield,
    hasRealApi: true,
    platforms: [
      { name: 'LIC', url: 'https://licindia.in', color: '#ff6b35', features: ['Trusted Brand', 'High Claim Ratio'] },
      { name: 'HDFC ERGO', url: 'https://hdfcergo.com', color: '#004c8c', features: ['Comprehensive Coverage', 'Quick Claims'] },
      { name: 'ICICI Lombard', url: 'https://icicilombard.com', color: '#b30000', features: ['Digital Services', 'Wide Network'] },
      { name: 'Star Health', url: 'https://starhealth.in', color: '#ff3366', features: ['Health Specialist', 'Cashless Treatment'] }
    ],
    description: 'Compare health, life, motor and travel insurance policies',
    keywords: ['insurance', 'health', 'life', 'motor', 'travel', 'policy', 'premium', 'coverage']
  },
  {
    id: 'banking',
    name: 'Banking & Cards',
    icon: CreditCard,
    hasRealApi: true,
    platforms: [
      { name: 'SBI', url: 'https://sbi.co.in', color: '#0066cc', features: ['Largest Network', 'Government Bank'] },
      { name: 'HDFC Bank', url: 'https://hdfcbank.com', color: '#004c8c', features: ['Premium Cards', 'Digital Banking'] },
      { name: 'ICICI Bank', url: 'https://icicibank.com', color: '#b30000', features: ['Tech Banking', 'Quick Loans'] },
      { name: 'Axis Bank', url: 'https://axisbank.com', color: '#800080', features: ['Lifestyle Banking', 'Rewards Program'] }
    ],
    description: 'Compare savings accounts, credit cards, loans and banking services',
    keywords: ['banking', 'credit card', 'savings account', 'loan', 'fd', 'interest rate']
  },

  // Statistics & Data Categories
  {
    id: 'statistics',
    name: 'Statistics & Data',
    icon: BarChart3,
    hasRealApi: true,
    platforms: [
      { name: 'World Bank', url: 'https://data.worldbank.org', color: '#009fda', features: ['Global Data', 'Economic Indicators'] },
      { name: 'UN Data', url: 'https://data.un.org', color: '#0077bb', features: ['Development Stats', 'Social Indicators'] },
      { name: 'OECD', url: 'https://data.oecd.org', color: '#cc0000', features: ['Economic Data', 'Policy Analysis'] },
      { name: 'IMF', url: 'https://imf.org/data', color: '#0066cc', features: ['Financial Data', 'Country Reports'] }
    ],
    description: 'Compare government data, GDP, employment, education, and economic indicators',
    keywords: ['statistics', 'data', 'gdp', 'economy', 'government', 'employment', 'education', 'world bank']
  },
  {
    id: 'stats-countries',
    name: 'Countries Data',
    icon: Globe,
    hasRealApi: true,
    platforms: [
      { name: 'REST Countries', url: 'https://restcountries.com', color: '#0066cc', features: ['Country Info', 'Real-time Data'] },
      { name: 'World Bank', url: 'https://data.worldbank.org', color: '#009fda', features: ['Country Statistics', 'Demographics'] }
    ],
    description: 'Compare countries by population, area, languages, currencies, and geography',
    keywords: ['countries', 'nations', 'geography', 'population', 'demographics', 'capital']
  },
  {
    id: 'stats-network',
    name: 'Internet & Network',
    icon: Globe,
    hasRealApi: true,
    platforms: [
      { name: 'Speedtest', url: 'https://speedtest.net', color: '#ff6600', features: ['Speed Tests', 'ISP Rankings'] },
      { name: 'World Bank', url: 'https://data.worldbank.org', color: '#009fda', features: ['Internet Statistics', 'Connectivity Data'] }
    ],
    description: 'Compare internet speeds, connectivity, and digital infrastructure across countries',
    keywords: ['internet', 'network', 'speed', 'broadband', 'connectivity', 'digital']
  },
  {
    id: 'stats-un-sdg',
    name: 'UN Development Goals',
    icon: Globe,
    hasRealApi: true,
    platforms: [
      { name: 'UN SDG', url: 'https://sdgs.un.org', color: '#0077bb', features: ['SDG Progress', 'Country Reports'] },
      { name: 'World Bank', url: 'https://data.worldbank.org', color: '#009fda', features: ['Development Indicators', 'Goal Tracking'] }
    ],
    description: 'Compare UN Sustainable Development Goals progress and targets',
    keywords: ['un', 'sustainable', 'development', 'sdg', 'goals', 'united nations']
  },
  {
    id: 'stats-education',
    name: 'Education Statistics',
    icon: GraduationCap,
    hasRealApi: true,
    platforms: [
      { name: 'UNESCO', url: 'https://uis.unesco.org', color: '#0066cc', features: ['Education Data', 'Global Statistics'] },
      { name: 'World Bank', url: 'https://data.worldbank.org', color: '#009fda', features: ['School Enrollment', 'Literacy Rates'] }
    ],
    description: 'Compare education spending, enrollment rates, and literacy statistics',
    keywords: ['education', 'school', 'literacy', 'enrollment', 'learning', 'unesco']
  },
  {
    id: 'stats-health',
    name: 'Health Statistics',
    icon: Heart,
    hasRealApi: true,
    platforms: [
      { name: 'WHO', url: 'https://who.int', color: '#0099cc', features: ['Health Data', 'Disease Statistics'] },
      { name: 'World Bank', url: 'https://data.worldbank.org', color: '#009fda', features: ['Life Expectancy', 'Healthcare Spending'] }
    ],
    description: 'Compare healthcare systems, life expectancy, and medical infrastructure',
    keywords: ['health', 'healthcare', 'medical', 'life expectancy', 'who', 'hospital']
  },
  {
    id: 'stats-environment',
    name: 'Environmental Data',
    icon: Globe,
    hasRealApi: true,
    platforms: [
      { name: 'World Bank', url: 'https://data.worldbank.org', color: '#009fda', features: ['Climate Data', 'Environmental Indicators'] },
      { name: 'UN Environment', url: 'https://unep.org', color: '#00a651', features: ['Sustainability Metrics', 'Emissions Data'] }
    ],
    description: 'Compare environmental metrics, emissions, renewable energy, and sustainability',
    keywords: ['environment', 'climate', 'emissions', 'sustainability', 'pollution', 'renewable']
  },
  {
    id: 'stats-crime',
    name: 'Crime & Safety',
    icon: Shield,
    hasRealApi: true,
    platforms: [
      { name: 'Numbeo', url: 'https://numbeo.com/crime', color: '#ff6600', features: ['Crime Index', 'Safety Ratings'] },
      { name: 'UNODC', url: 'https://dataunodc.un.org', color: '#0077bb', features: ['Crime Statistics', 'Global Data'] }
    ],
    description: 'Compare crime rates, safety indices, and security statistics',
    keywords: ['crime', 'safety', 'security', 'violence', 'law', 'enforcement']
  },
  {
    id: 'stats-labor',
    name: 'Labor & Employment',
    icon: Briefcase,
    hasRealApi: true,
    platforms: [
      { name: 'ILO', url: 'https://ilo.org', color: '#cc0000', features: ['Labor Statistics', 'Employment Data'] },
      { name: 'World Bank', url: 'https://data.worldbank.org', color: '#009fda', features: ['Workforce Data', 'Unemployment Rates'] }
    ],
    description: 'Compare employment rates, labor force participation, and job market statistics',
    keywords: ['labor', 'employment', 'jobs', 'workforce', 'unemployment', 'work']
  },
  {
    id: 'stats-religion',
    name: 'Religion Statistics',
    icon: Globe,
    hasRealApi: false,
    platforms: [
      { name: 'Pew Research', url: 'https://pewresearch.org', color: '#ff6b35', features: ['Religious Demographics', 'Global Surveys'] },
      { name: 'World Religion Database', url: 'https://worldreligiondatabase.org', color: '#0066cc', features: ['Comprehensive Data', 'Historical Trends'] }
    ],
    description: 'Compare religious demographics, population, growth rates, and distribution',
    keywords: ['religion', 'demographics', 'population', 'faith', 'religious statistics']
  },
  {
    id: 'stats-financial',
    name: 'Financial Power',
    icon: DollarSign,
    hasRealApi: false,
    platforms: [
      { name: 'Forbes', url: 'https://forbes.com', color: '#0066cc', features: ['Wealth Rankings', 'Company Data'] },
      { name: 'Bloomberg', url: 'https://bloomberg.com', color: '#ff6600', features: ['Market Data', 'Financial News'] },
      { name: 'World Bank', url: 'https://worldbank.org', color: '#009fda', features: ['Country Economics', 'Development Data'] }
    ],
    description: 'Compare financial power of countries, companies, and individuals',
    keywords: ['financial', 'wealth', 'gdp', 'revenue', 'market cap', 'rich list']
  },
  {
    id: 'stats-political',
    name: 'Political Comparison',
    icon: Landmark,
    hasRealApi: false,
    platforms: [
      { name: 'Political Database', url: 'https://politicaldata.org', color: '#cc0000', features: ['Party Data', 'Election Results'] },
      { name: 'Parliament Data', url: 'https://parliamentdata.org', color: '#0066cc', features: ['Legislative Data', 'Voting Records'] }
    ],
    description: 'Compare political parties, policies, history, and performance',
    keywords: ['political', 'party', 'politics', 'election', 'government', 'policy']
  },
  {
    id: 'stats-person',
    name: 'Person Comparison',
    icon: Users2,
    hasRealApi: false,
    platforms: [
      { name: 'Forbes', url: 'https://forbes.com', color: '#0066cc', features: ['Billionaire List', 'Celebrity Rankings'] },
      { name: 'Wikipedia', url: 'https://wikipedia.org', color: '#000000', features: ['Biographical Data', 'Achievements'] }
    ],
    description: 'Compare individuals by wealth, influence, career, and achievements',
    keywords: ['person', 'celebrity', 'billionaire', 'influence', 'achievements', 'comparison']
  }
];

export const getHighPriorityCategories = (): Category[] => {
  return getAllCategories().slice(0, 6);
};

export const getRemainingCategories = (): Category[] => {
  return getAllCategories().slice(6);
};
