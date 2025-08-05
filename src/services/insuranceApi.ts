export interface InsurancePolicy {
  id: string;
  provider: string;
  policyType: 'health' | 'life' | 'motor' | 'travel' | 'term';
  policyName: string;
  premium: number;
  coverage: number;
  tenure: string;
  features: string[];
  claimRatio: number;
  rating: number;
  url: string;
  ageLimit?: string;
}

export const searchInsurancePolicies = async (type: string, coverage?: number): Promise<InsurancePolicy[]> => {
  await new Promise(resolve => setTimeout(resolve, 1300));
  
  const providers = [
    {
      name: 'LIC',
      policies: {
        health: { name: 'Jeevan Arogya', premium: 8500, coverage: 500000, claimRatio: 85 },
        life: { name: 'Jeevan Anand', premium: 15000, coverage: 1000000, claimRatio: 95 },
        term: { name: 'Tech Term', premium: 12000, coverage: 2000000, claimRatio: 98 }
      },
      url: 'https://licindia.in'
    },
    {
      name: 'HDFC ERGO',
      policies: {
        health: { name: 'My Health Suraksha', premium: 7800, coverage: 500000, claimRatio: 82 },
        motor: { name: 'Motor Insurance', premium: 5500, coverage: 100000, claimRatio: 78 },
        travel: { name: 'Travel Guard', premium: 2500, coverage: 100000, claimRatio: 90 }
      },
      url: 'https://hdfcergo.com'
    },
    {
      name: 'ICICI Lombard',
      policies: {
        health: { name: 'Complete Health Insurance', premium: 9200, coverage: 500000, claimRatio: 88 },
        motor: { name: 'Comprehensive Motor', premium: 6200, coverage: 100000, claimRatio: 80 },
        travel: { name: 'Student Travel', premium: 3200, coverage: 150000, claimRatio: 92 }
      },
      url: 'https://icicilombard.com'
    },
    {
      name: 'Star Health',
      policies: {
        health: { name: 'Star Comprehensive', premium: 8900, coverage: 500000, claimRatio: 86 },
        life: { name: 'Star Life Shield', premium: 14500, coverage: 1000000, claimRatio: 94 }
      },
      url: 'https://starhealth.in'
    },
    {
      name: 'Bajaj Allianz',
      policies: {
        health: { name: 'Health Guard', premium: 8200, coverage: 500000, claimRatio: 84 },
        motor: { name: 'Motor Package', premium: 5800, coverage: 100000, claimRatio: 79 },
        travel: { name: 'Travel Assurance', premium: 2800, coverage: 120000, claimRatio: 89 }
      },
      url: 'https://bajajallianz.com'
    }
  ];

  const results: InsurancePolicy[] = [];
  
  providers.forEach((provider, index) => {
    const policy = provider.policies[type as keyof typeof provider.policies];
    if (policy) {
      const variation = 0.9 + Math.random() * 0.2;
      
      results.push({
        id: `insurance-${provider.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        provider: provider.name,
        policyType: type as any,
        policyName: policy.name,
        premium: Math.round(policy.premium * variation),
        coverage: policy.coverage,
        tenure: type === 'travel' ? '1 Year' : type === 'term' ? '30 Years' : '20 Years',
        claimRatio: policy.claimRatio,
        rating: Math.floor(3.5 + Math.random() * 1.5),
        features: [
          'Cashless Treatment',
          'Pre & Post Hospitalization',
          'Online Claim Process',
          'No Medical Check-up',
          '24/7 Customer Support'
        ],
        url: provider.url,
        ageLimit: '18-65 years'
      });
    }
  });

  return results.sort((a, b) => b.claimRatio - a.claimRatio);
};