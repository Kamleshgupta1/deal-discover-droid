export interface BankingProduct {
  id: string;
  bank: string;
  productType: 'savings' | 'current' | 'fd' | 'creditcard' | 'loan';
  productName: string;
  interestRate?: number;
  minBalance?: number;
  features: string[];
  fees: number;
  rating: number;
  url: string;
  processingTime?: string;
  creditLimit?: number;
  annualFee?: number;
}

export const searchBankingProducts = async (type: string): Promise<BankingProduct[]> => {
  await new Promise(resolve => setTimeout(resolve, 1100));
  
  const banks = [
    {
      name: 'SBI',
      products: {
        savings: { name: 'SBI Savings Account', rate: 2.7, minBalance: 3000, fees: 0 },
        creditcard: { name: 'SBI Card PRIME', limit: 200000, annualFee: 2999, rate: 0 },
        fd: { name: 'SBI Fixed Deposit', rate: 6.5, minBalance: 1000, fees: 0 },
        loan: { name: 'SBI Personal Loan', rate: 10.5, minBalance: 0, fees: 1000 }
      },
      url: 'https://sbi.co.in'
    },
    {
      name: 'HDFC Bank',
      products: {
        savings: { name: 'HDFC Savings Account', rate: 3.0, minBalance: 5000, fees: 0 },
        creditcard: { name: 'HDFC Regalia', limit: 300000, annualFee: 2500, rate: 0 },
        fd: { name: 'HDFC Fixed Deposit', rate: 6.75, minBalance: 5000, fees: 0 },
        loan: { name: 'HDFC Personal Loan', rate: 10.25, minBalance: 0, fees: 1500 }
      },
      url: 'https://hdfcbank.com'
    },
    {
      name: 'ICICI Bank',
      products: {
        savings: { name: 'ICICI Savings Account', rate: 3.0, minBalance: 5000, fees: 0 },
        creditcard: { name: 'ICICI Amazon Pay', limit: 250000, annualFee: 999, rate: 0 },
        fd: { name: 'ICICI Fixed Deposit', rate: 6.8, minBalance: 5000, fees: 0 },
        loan: { name: 'ICICI Personal Loan', rate: 10.75, minBalance: 0, fees: 1200 }
      },
      url: 'https://icicibank.com'
    },
    {
      name: 'Axis Bank',
      products: {
        savings: { name: 'Axis Savings Account', rate: 3.0, minBalance: 5000, fees: 0 },
        creditcard: { name: 'Axis Magnus', limit: 500000, annualFee: 12500, rate: 0 },
        fd: { name: 'Axis Fixed Deposit', rate: 7.0, minBalance: 5000, fees: 0 },
        loan: { name: 'Axis Personal Loan', rate: 10.49, minBalance: 0, fees: 999 }
      },
      url: 'https://axisbank.com'
    },
    {
      name: 'Kotak Bank',
      products: {
        savings: { name: 'Kotak 811', rate: 3.5, minBalance: 0, fees: 0 },
        creditcard: { name: 'Kotak White Reserve', limit: 1000000, annualFee: 99999, rate: 0 },
        fd: { name: 'Kotak Fixed Deposit', rate: 6.9, minBalance: 1000, fees: 0 },
        loan: { name: 'Kotak Personal Loan', rate: 10.99, minBalance: 0, fees: 1499 }
      },
      url: 'https://kotak.com'
    }
  ];

  const results: BankingProduct[] = [];
  
  banks.forEach((bank, index) => {
    const product = bank.products[type as keyof typeof bank.products];
    if (product) {
      const variation = 0.95 + Math.random() * 0.1;
      
      results.push({
        id: `banking-${bank.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        bank: bank.name,
        productType: type as any,
        productName: product.name,
        interestRate: product.rate,
        minBalance: 'minBalance' in product ? product.minBalance : undefined,
        fees: 'fees' in product ? Math.round(product.fees * variation) : 0,
        rating: Math.floor(3.5 + Math.random() * 1.5),
        features: type === 'creditcard' ? 
          ['Reward Points', 'Airport Lounge Access', 'Fuel Surcharge Waiver', 'EMI Conversion'] :
          type === 'savings' ?
          ['Online Banking', 'Mobile Banking', 'ATM Access', 'Cheque Book'] :
          ['Competitive Rates', 'Quick Processing', 'Flexible Tenure', 'Easy Documentation'],
        url: bank.url,
        processingTime: type === 'loan' ? '2-3 days' : type === 'creditcard' ? '7-10 days' : 'Instant',
        creditLimit: 'limit' in product ? product.limit : undefined,
        annualFee: 'annualFee' in product ? product.annualFee : undefined
      });
    }
  });

  return results.sort((a, b) => (b.interestRate || 0) - (a.interestRate || 0));
};