export interface MutualFund {
  id: string;
  fundName: string;
  provider: string;
  category: string;
  nav: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  expenseRatio: number;
  minInvestment: number;
  rating: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  features: string[];
  url: string;
}

export const searchMutualFunds = async (category: string): Promise<MutualFund[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const funds = [
    {
      fundName: 'SBI Bluechip Fund',
      provider: 'SBI Mutual Fund',
      category: 'Large Cap',
      nav: 65.42,
      returns1Y: 12.5,
      returns3Y: 15.8,
      returns5Y: 14.2,
      expenseRatio: 1.8,
      minInvestment: 500,
      rating: 4,
      riskLevel: 'Moderate' as const,
      url: 'https://sbimf.com'
    },
    {
      fundName: 'HDFC Top 100 Fund',
      provider: 'HDFC Mutual Fund',
      category: 'Large Cap',
      nav: 742.18,
      returns1Y: 14.2,
      returns3Y: 16.5,
      returns5Y: 15.1,
      expenseRatio: 1.5,
      minInvestment: 500,
      rating: 5,
      riskLevel: 'Moderate' as const,
      url: 'https://hdfcfund.com'
    },
    {
      fundName: 'ICICI Prudential Technology Fund',
      provider: 'ICICI Prudential',
      category: 'Sector',
      nav: 156.89,
      returns1Y: 22.8,
      returns3Y: 28.5,
      returns5Y: 19.6,
      expenseRatio: 2.1,
      minInvestment: 500,
      rating: 4,
      riskLevel: 'High' as const,
      url: 'https://icicipruamc.com'
    },
    {
      fundName: 'Axis Small Cap Fund',
      provider: 'Axis Mutual Fund',
      category: 'Small Cap',
      nav: 58.73,
      returns1Y: 18.5,
      returns3Y: 22.8,
      returns5Y: 17.9,
      expenseRatio: 1.9,
      minInvestment: 500,
      rating: 4,
      riskLevel: 'High' as const,
      url: 'https://axismf.com'
    },
    {
      fundName: 'Mirae Asset Emerging Bluechip',
      provider: 'Mirae Asset',
      category: 'Large & Mid Cap',
      nav: 89.45,
      returns1Y: 16.2,
      returns3Y: 19.8,
      returns5Y: 16.7,
      expenseRatio: 1.7,
      minInvestment: 500,
      rating: 5,
      riskLevel: 'Moderate' as const,
      url: 'https://miraeassetmf.co.in'
    }
  ];

  const results: MutualFund[] = funds.map((fund, index) => ({
    ...fund,
    id: `mf-${index}`,
    features: [
      'SIP Available',
      'Tax Saving',
      'Professional Management',
      'Diversified Portfolio'
    ]
  }));

  return results.sort((a, b) => b.returns1Y - a.returns1Y);
};