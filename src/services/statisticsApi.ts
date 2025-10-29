// World Bank API for government and economic data
// API Documentation: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation

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
