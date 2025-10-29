// World Bank API for government and economic data
// API Documentation: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation
// REST Countries API: https://restcountries.com
// UN Data Portal: https://data.un.org

interface WorldBankIndicator {
  id: string;
  name: string;
  unit: string;
  sourceNote: string;
  sourceOrganization: string;
}

interface WorldBankData {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

interface CountryData {
  country: string;
  year: string;
  value: number;
  indicator: string;
}

interface CountryInfo {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  languages: string[];
  currencies: string[];
  timezones: string[];
  borders: string[];
  gini?: number;
  flag: string;
}

interface NetworkData {
  country: string;
  avgSpeed: number;
  mobileSpeed: number;
  broadbandSpeed: number;
  internetUsers: number;
  coverage: number;
}

// Common World Bank Indicators
const INDICATORS = {
  GDP: 'NY.GDP.MKTP.CD', // GDP (current US$)
  GDP_GROWTH: 'NY.GDP.MKTP.KD.ZG', // GDP growth (annual %)
  GDP_PER_CAPITA: 'NY.GDP.PCAP.CD', // GDP per capita (current US$)
  POPULATION: 'SP.POP.TOTL', // Population, total
  UNEMPLOYMENT: 'SL.UEM.TOTL.ZS', // Unemployment, total (% of total labor force)
  LIFE_EXPECTANCY: 'SP.DYN.LE00.IN', // Life expectancy at birth, total (years)
  EDUCATION_EXPENDITURE: 'SE.XPD.TOTL.GD.ZS', // Government expenditure on education, total (% of GDP)
  HEALTH_EXPENDITURE: 'SH.XPD.CHEX.GD.ZS', // Current health expenditure (% of GDP)
  CO2_EMISSIONS: 'EN.ATM.CO2E.PC', // CO2 emissions (metric tons per capita)
  INTERNET_USERS: 'IT.NET.USER.ZS', // Individuals using the Internet (% of population)
  POVERTY_RATIO: 'SI.POV.DDAY', // Poverty headcount ratio at $2.15 a day
  SCHOOL_ENROLLMENT: 'SE.PRM.ENRR', // School enrollment, primary (% gross)
  INFLATION: 'FP.CPI.TOTL.ZG', // Inflation, consumer prices (annual %)
  EXPORTS: 'NE.EXP.GNFS.ZS', // Exports of goods and services (% of GDP)
  IMPORTS: 'NE.IMP.GNFS.ZS', // Imports of goods and services (% of GDP)
  MILITARY_EXPENDITURE: 'MS.MIL.XPND.GD.ZS', // Military expenditure (% of GDP)
  FOREST_AREA: 'AG.LND.FRST.ZS', // Forest area (% of land area)
  RENEWABLE_ENERGY: 'EG.FEC.RNEW.ZS', // Renewable energy consumption (% of total final energy consumption)
};

const INDICATOR_NAMES: Record<string, string> = {
  [INDICATORS.GDP]: 'GDP (current US$)',
  [INDICATORS.GDP_GROWTH]: 'GDP Growth Rate (%)',
  [INDICATORS.GDP_PER_CAPITA]: 'GDP per Capita (US$)',
  [INDICATORS.POPULATION]: 'Total Population',
  [INDICATORS.UNEMPLOYMENT]: 'Unemployment Rate (%)',
  [INDICATORS.LIFE_EXPECTANCY]: 'Life Expectancy (years)',
  [INDICATORS.EDUCATION_EXPENDITURE]: 'Education Expenditure (% of GDP)',
  [INDICATORS.HEALTH_EXPENDITURE]: 'Health Expenditure (% of GDP)',
  [INDICATORS.CO2_EMISSIONS]: 'CO2 Emissions (metric tons per capita)',
  [INDICATORS.INTERNET_USERS]: 'Internet Users (%)',
  [INDICATORS.POVERTY_RATIO]: 'Poverty Ratio ($2.15/day)',
  [INDICATORS.SCHOOL_ENROLLMENT]: 'School Enrollment (%)',
  [INDICATORS.INFLATION]: 'Inflation Rate (%)',
  [INDICATORS.EXPORTS]: 'Exports (% of GDP)',
  [INDICATORS.IMPORTS]: 'Imports (% of GDP)',
  [INDICATORS.MILITARY_EXPENDITURE]: 'Military Spending (% of GDP)',
  [INDICATORS.FOREST_AREA]: 'Forest Area (%)',
  [INDICATORS.RENEWABLE_ENERGY]: 'Renewable Energy (%)',
};

// Popular country codes
const COUNTRY_CODES: Record<string, string> = {
  'india': 'IND', 'usa': 'USA', 'united states': 'USA', 'china': 'CHN',
  'japan': 'JPN', 'germany': 'DEU', 'uk': 'GBR', 'united kingdom': 'GBR',
  'france': 'FRA', 'brazil': 'BRA', 'italy': 'ITA', 'canada': 'CAN',
  'russia': 'RUS', 'south korea': 'KOR', 'australia': 'AUS', 'spain': 'ESP',
  'mexico': 'MEX', 'indonesia': 'IDN', 'netherlands': 'NLD', 'saudi arabia': 'SAU',
  'turkey': 'TUR', 'switzerland': 'CHE', 'argentina': 'ARG', 'sweden': 'SWE',
  'poland': 'POL', 'belgium': 'BEL', 'thailand': 'THA', 'nigeria': 'NGA',
  'egypt': 'EGY', 'pakistan': 'PAK', 'bangladesh': 'BGD', 'vietnam': 'VNM',
  'world': 'WLD',
};

const getCountryCode = (countryName: string): string => {
  const normalized = countryName.toLowerCase().trim();
  return COUNTRY_CODES[normalized] || normalized.toUpperCase().slice(0, 3);
};

const fetchWorldBankData = async (
  countryCode: string,
  indicator: string,
  year?: string
): Promise<CountryData[]> => {
  try {
    const yearParam = year || '2020:2023'; // Last 4 years if not specified
    const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json&date=${yearParam}&per_page=100`;
    
    const response = await fetch(url);
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 2) return [];
    
    const results: WorldBankData[] = data[1];
    return results
      .filter((item: WorldBankData) => item.value !== null)
      .map((item: WorldBankData) => ({
        country: item.country.value,
        year: item.date,
        value: item.value!,
        indicator: INDICATOR_NAMES[indicator] || indicator,
      }))
      .sort((a, b) => b.year.localeCompare(a.year));
  } catch (error) {
    console.error('World Bank API error:', error);
    return [];
  }
};

export const searchStatistics = async (
  topic: string,
  country1: string,
  country2?: string,
  year?: string
) => {
  // Find relevant indicators based on topic
  const topicLower = topic.toLowerCase();
  let selectedIndicators: string[] = [];

  if (topicLower.includes('gdp') || topicLower.includes('economy') || topicLower.includes('economic')) {
    selectedIndicators = [INDICATORS.GDP, INDICATORS.GDP_GROWTH, INDICATORS.GDP_PER_CAPITA];
  } else if (topicLower.includes('employ') || topicLower.includes('job')) {
    selectedIndicators = [INDICATORS.UNEMPLOYMENT, INDICATORS.GDP_PER_CAPITA];
  } else if (topicLower.includes('health')) {
    selectedIndicators = [INDICATORS.LIFE_EXPECTANCY, INDICATORS.HEALTH_EXPENDITURE];
  } else if (topicLower.includes('education')) {
    selectedIndicators = [INDICATORS.EDUCATION_EXPENDITURE, INDICATORS.SCHOOL_ENROLLMENT];
  } else if (topicLower.includes('population')) {
    selectedIndicators = [INDICATORS.POPULATION, INDICATORS.LIFE_EXPECTANCY];
  } else if (topicLower.includes('poverty')) {
    selectedIndicators = [INDICATORS.POVERTY_RATIO, INDICATORS.GDP_PER_CAPITA];
  } else if (topicLower.includes('environment') || topicLower.includes('climate')) {
    selectedIndicators = [INDICATORS.CO2_EMISSIONS, INDICATORS.FOREST_AREA, INDICATORS.RENEWABLE_ENERGY];
  } else if (topicLower.includes('technology') || topicLower.includes('internet')) {
    selectedIndicators = [INDICATORS.INTERNET_USERS];
  } else if (topicLower.includes('military') || topicLower.includes('defense')) {
    selectedIndicators = [INDICATORS.MILITARY_EXPENDITURE, INDICATORS.GDP];
  } else if (topicLower.includes('trade') || topicLower.includes('export') || topicLower.includes('import')) {
    selectedIndicators = [INDICATORS.EXPORTS, INDICATORS.IMPORTS];
  } else {
    // Default comprehensive comparison
    selectedIndicators = [
      INDICATORS.GDP,
      INDICATORS.GDP_PER_CAPITA,
      INDICATORS.POPULATION,
      INDICATORS.UNEMPLOYMENT,
      INDICATORS.LIFE_EXPECTANCY,
    ];
  }

  const code1 = getCountryCode(country1);
  const code2 = country2 ? getCountryCode(country2) : null;

  const results = await Promise.all([
    ...selectedIndicators.map(ind => fetchWorldBankData(code1, ind, year)),
    ...(code2 ? selectedIndicators.map(ind => fetchWorldBankData(code2, ind, year)) : []),
  ]);

  return {
    country1: country1,
    country2: country2 || null,
    indicators: selectedIndicators.map(ind => INDICATOR_NAMES[ind] || ind),
    data: results.filter(r => r.length > 0),
  };
};

// Mock data generators for other statistics categories
export const generateReligionComparison = (religion1: string, religion2?: string, country?: string) => {
  // In a real implementation, this would use demographic APIs
  const religions = [religion1, religion2].filter(Boolean);
  
  return {
    religions,
    country: country || 'World',
    data: {
      population: {
        [religion1]: Math.floor(Math.random() * 2000000000) + 100000000,
        ...(religion2 && { [religion2]: Math.floor(Math.random() * 2000000000) + 100000000 }),
      },
      growthRate: {
        [religion1]: (Math.random() * 3 - 0.5).toFixed(2) + '%',
        ...(religion2 && { [religion2]: (Math.random() * 3 - 0.5).toFixed(2) + '%' }),
      },
      distribution: {
        [religion1]: `Major presence in ${Math.floor(Math.random() * 100)} countries`,
        ...(religion2 && { [religion2]: `Major presence in ${Math.floor(Math.random() * 100)} countries` }),
      },
    },
  };
};

export const generateFinancialComparison = (entity1: string, entity2?: string, metric?: string, year?: string) => {
  const entities = [entity1, entity2].filter(Boolean);
  
  return {
    entities,
    metric: metric || 'GDP/Revenue',
    year: year || '2023',
    data: entities.map(entity => ({
      name: entity,
      value: Math.floor(Math.random() * 10000000000000),
      rank: Math.floor(Math.random() * 100) + 1,
      growth: (Math.random() * 20 - 5).toFixed(2) + '%',
      marketCap: Math.floor(Math.random() * 5000000000000),
    })),
  };
};

export const generatePoliticalComparison = (party1: string, country: string, party2?: string) => {
  const parties = [party1, party2].filter(Boolean);
  
  return {
    parties,
    country,
    comparison: parties.map(party => ({
      name: party,
      founded: Math.floor(Math.random() * 100) + 1920,
      ideology: ['Progressive', 'Conservative', 'Liberal', 'Socialist', 'Centrist'][Math.floor(Math.random() * 5)],
      seats: Math.floor(Math.random() * 300),
      voteshare: (Math.random() * 50).toFixed(1) + '%',
      keyPolicies: [
        'Economic reform',
        'Healthcare expansion',
        'Education investment',
        'Infrastructure development',
      ].slice(0, Math.floor(Math.random() * 3) + 2),
    })),
  };
};

export const generatePersonComparison = (person1: string, aspect?: string, person2?: string) => {
  const people = [person1, person2].filter(Boolean);
  
  return {
    people,
    aspect: aspect || 'Overall Comparison',
    comparison: people.map(person => ({
      name: person,
      netWorth: `$${(Math.random() * 200 + 10).toFixed(1)}B`,
      age: Math.floor(Math.random() * 40) + 40,
      industry: ['Technology', 'Finance', 'Retail', 'Automotive', 'Entertainment'][Math.floor(Math.random() * 5)],
      companies: Math.floor(Math.random() * 5) + 1,
      achievements: [
        'Forbes Richest List',
        'Philanthropist',
        'Innovation Award',
        'Business Leader of the Year',
      ].slice(0, Math.floor(Math.random() * 3) + 2),
      influence: Math.floor(Math.random() * 100),
    })),
  };
};

// REST Countries API - Free country data comparison
export const searchCountriesData = async (country1: string, country2?: string) => {
  try {
    const countries = [country1, country2].filter(Boolean);
    const results = await Promise.all(
      countries.map(async (country) => {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=false`);
        if (!response.ok) return null;
        const data = await response.json();
        const countryData = data[0];
        
        return {
          name: countryData.name.common,
          officialName: countryData.name.official,
          capital: countryData.capital?.[0] || 'N/A',
          region: countryData.region,
          subregion: countryData.subregion || 'N/A',
          population: countryData.population,
          area: countryData.area,
          languages: Object.values(countryData.languages || {}).join(', '),
          currencies: Object.values(countryData.currencies || {}).map((c: any) => c.name).join(', '),
          timezones: countryData.timezones.join(', '),
          borders: countryData.borders?.length || 0,
          gini: countryData.gini ? Object.values(countryData.gini)[0] : null,
          flag: countryData.flags.svg,
          coatOfArms: countryData.coatOfArms?.svg,
          independent: countryData.independent,
          unMember: countryData.unMember,
          landlocked: countryData.landlocked,
          continents: countryData.continents.join(', '),
        };
      })
    );
    
    return {
      countries: results.filter(Boolean),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('REST Countries API error:', error);
    return { countries: [], timestamp: new Date().toISOString() };
  }
};

// Network/Internet Statistics Comparison
export const searchNetworkData = async (country1: string, country2?: string) => {
  // Using World Bank Internet indicators
  const countries = [country1, country2].filter(Boolean);
  const code1 = getCountryCode(country1);
  const code2 = country2 ? getCountryCode(country2) : null;
  
  try {
    const networkIndicators = [
      INDICATORS.INTERNET_USERS,
      'IT.NET.BBND.P2', // Fixed broadband subscriptions (per 100 people)
      'IT.CEL.SETS.P2', // Mobile cellular subscriptions (per 100 people)
    ];
    
    const results = await Promise.all([
      ...networkIndicators.map(ind => fetchWorldBankData(code1, ind)),
      ...(code2 ? networkIndicators.map(ind => fetchWorldBankData(code2, ind)) : []),
    ]);
    
    return {
      countries,
      indicators: ['Internet Users %', 'Broadband Subscriptions', 'Mobile Subscriptions'],
      data: results.filter(r => r.length > 0),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Network data API error:', error);
    return { countries, indicators: [], data: [], timestamp: new Date().toISOString() };
  }
};

// UN SDG (Sustainable Development Goals) Data
export const searchUNSDGData = async (country1: string, goal: string, country2?: string) => {
  // Mock UN SDG data - In production, use UN Data API
  const countries = [country1, country2].filter(Boolean);
  
  const sdgGoals: Record<string, string> = {
    'poverty': 'No Poverty',
    'hunger': 'Zero Hunger',
    'health': 'Good Health and Well-being',
    'education': 'Quality Education',
    'gender': 'Gender Equality',
    'water': 'Clean Water and Sanitation',
    'energy': 'Affordable and Clean Energy',
    'economy': 'Decent Work and Economic Growth',
    'innovation': 'Industry, Innovation and Infrastructure',
    'inequality': 'Reduced Inequalities',
    'cities': 'Sustainable Cities and Communities',
    'consumption': 'Responsible Consumption and Production',
    'climate': 'Climate Action',
    'ocean': 'Life Below Water',
    'land': 'Life on Land',
    'peace': 'Peace, Justice and Strong Institutions',
    'partnership': 'Partnerships for the Goals',
  };
  
  return {
    countries,
    goal: sdgGoals[goal.toLowerCase()] || goal,
    data: countries.map(country => ({
      country,
      goalProgress: (Math.random() * 100).toFixed(1) + '%',
      targetsMet: Math.floor(Math.random() * 15),
      totalTargets: 17,
      lastUpdated: '2023',
      status: ['On Track', 'Moderate Progress', 'Needs Acceleration'][Math.floor(Math.random() * 3)],
    })),
  };
};

// Education Data Comparison (UNESCO/World Bank)
export const searchEducationData = async (country1: string, country2?: string) => {
  const code1 = getCountryCode(country1);
  const code2 = country2 ? getCountryCode(country2) : null;
  
  const eduIndicators = [
    INDICATORS.EDUCATION_EXPENDITURE,
    INDICATORS.SCHOOL_ENROLLMENT,
    'SE.SEC.ENRR', // School enrollment, secondary (% gross)
    'SE.TER.ENRR', // School enrollment, tertiary (% gross)
    'SE.ADT.LITR.ZS', // Literacy rate, adult total (% of people ages 15 and above)
  ];
  
  const results = await Promise.all([
    ...eduIndicators.map(ind => fetchWorldBankData(code1, ind)),
    ...(code2 ? eduIndicators.map(ind => fetchWorldBankData(code2, ind)) : []),
  ]);
  
  return {
    country1,
    country2: country2 || null,
    indicators: ['Education Spending', 'Primary Enrollment', 'Secondary Enrollment', 'Tertiary Enrollment', 'Literacy Rate'],
    data: results.filter(r => r.length > 0),
  };
};

// Health Data Comparison (WHO/World Bank)
export const searchHealthData = async (country1: string, country2?: string) => {
  const code1 = getCountryCode(country1);
  const code2 = country2 ? getCountryCode(country2) : null;
  
  const healthIndicators = [
    INDICATORS.LIFE_EXPECTANCY,
    INDICATORS.HEALTH_EXPENDITURE,
    'SH.MED.PHYS.ZS', // Physicians (per 1,000 people)
    'SH.MED.BEDS.ZS', // Hospital beds (per 1,000 people)
    'SH.STA.MMRT', // Maternal mortality ratio
    'SP.DYN.IMRT.IN', // Infant mortality rate
  ];
  
  const results = await Promise.all([
    ...healthIndicators.map(ind => fetchWorldBankData(code1, ind)),
    ...(code2 ? healthIndicators.map(ind => fetchWorldBankData(code2, ind)) : []),
  ]);
  
  return {
    country1,
    country2: country2 || null,
    indicators: ['Life Expectancy', 'Health Spending', 'Physicians Density', 'Hospital Beds', 'Maternal Mortality', 'Infant Mortality'],
    data: results.filter(r => r.length > 0),
  };
};

// Environmental Data Comparison
export const searchEnvironmentData = async (country1: string, country2?: string) => {
  const code1 = getCountryCode(country1);
  const code2 = country2 ? getCountryCode(country2) : null;
  
  const envIndicators = [
    INDICATORS.CO2_EMISSIONS,
    INDICATORS.FOREST_AREA,
    INDICATORS.RENEWABLE_ENERGY,
    'EN.ATM.PM25.MC.M3', // PM2.5 air pollution
    'ER.H2O.FWTL.K3', // Annual freshwater withdrawals
    'AG.LND.AGRI.ZS', // Agricultural land (% of land area)
  ];
  
  const results = await Promise.all([
    ...envIndicators.map(ind => fetchWorldBankData(code1, ind)),
    ...(code2 ? envIndicators.map(ind => fetchWorldBankData(code2, ind)) : []),
  ]);
  
  return {
    country1,
    country2: country2 || null,
    indicators: ['CO2 Emissions', 'Forest Coverage', 'Renewable Energy', 'Air Pollution', 'Water Usage', 'Agricultural Land'],
    data: results.filter(r => r.length > 0),
  };
};

// Crime and Safety Statistics
export const searchCrimeData = async (country1: string, country2?: string) => {
  // Mock data - In production, use APIs like Numbeo or official crime databases
  const countries = [country1, country2].filter(Boolean);
  
  return {
    countries,
    data: countries.map(country => ({
      country,
      crimeIndex: (Math.random() * 100).toFixed(1),
      safetyIndex: (Math.random() * 100).toFixed(1),
      homicideRate: (Math.random() * 50).toFixed(2),
      robberyRate: (Math.random() * 100).toFixed(2),
      assaultRate: (Math.random() * 200).toFixed(2),
      lastUpdated: '2023',
    })),
  };
};

// Labor and Employment Data
export const searchLaborData = async (country1: string, country2?: string) => {
  const code1 = getCountryCode(country1);
  const code2 = country2 ? getCountryCode(country2) : null;
  
  const laborIndicators = [
    INDICATORS.UNEMPLOYMENT,
    'SL.TLF.TOTL.IN', // Labor force, total
    'SL.TLF.CACT.FE.ZS', // Labor force participation rate, female
    'SL.EMP.VULN.ZS', // Vulnerable employment
    'SL.UEM.ADVN.ZS', // Unemployment with advanced education
  ];
  
  const results = await Promise.all([
    ...laborIndicators.map(ind => fetchWorldBankData(code1, ind)),
    ...(code2 ? laborIndicators.map(ind => fetchWorldBankData(code2, ind)) : []),
  ]);
  
  return {
    country1,
    country2: country2 || null,
    indicators: ['Unemployment Rate', 'Labor Force', 'Female Participation', 'Vulnerable Employment', 'Educated Unemployment'],
    data: results.filter(r => r.length > 0),
  };
};
