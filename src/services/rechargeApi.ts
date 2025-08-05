export interface RechargeOption {
  id: string;
  provider: string;
  rechargeType: 'mobile' | 'dth' | 'electricity' | 'broadband' | 'datacard';
  plan: string;
  amount: number;
  validity: string;
  benefits: string[];
  features: string[];
  url: string;
  cashback?: number;
}

export const searchRechargeOptions = async (type: string, provider?: string): Promise<RechargeOption[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const platforms = [
    { name: 'Paytm', cashback: 5, url: 'https://paytm.com' },
    { name: 'PhonePe', cashback: 3, url: 'https://phonepe.com' },
    { name: 'Google Pay', cashback: 2, url: 'https://pay.google.com' },
    { name: 'Amazon Pay', cashback: 4, url: 'https://amazon.in/pay' },
    { name: 'Freecharge', cashback: 6, url: 'https://freecharge.in' },
    { name: 'MobiKwik', cashback: 5, url: 'https://mobikwik.com' }
  ];

  const mobileProviders = ['Airtel', 'Jio', 'Vi', 'BSNL'];
  const dthProviders = ['Tata Sky', 'Airtel Digital TV', 'Dish TV', 'Sun Direct'];
  
  const plans = type === 'mobile' ? [
    { plan: 'Unlimited Talk & Data', amount: 599, validity: '84 days', benefits: ['Unlimited Calls', '2GB/day', '100 SMS/day'] },
    { plan: 'Full Talktime', amount: 199, validity: '30 days', benefits: ['Full Talktime', 'Local & STD', '28 days validity'] },
    { plan: 'Data Pack', amount: 399, validity: '56 days', benefits: ['6GB Data', 'No Calls', 'High Speed'] }
  ] : [
    { plan: 'Monthly Pack', amount: 299, validity: '30 days', benefits: ['200+ Channels', 'HD Quality', 'Free Installation'] },
    { plan: 'Sports Pack', amount: 199, validity: '30 days', benefits: ['Sports Channels', 'Live Matches', 'HD Sports'] }
  ];

  const results: RechargeOption[] = [];
  
  platforms.forEach((platform, pIndex) => {
    plans.forEach((plan, planIndex) => {
      const variation = 0.95 + Math.random() * 0.1;
      const finalAmount = Math.round(plan.amount * variation);
      
      results.push({
        id: `${platform.name.toLowerCase()}-${pIndex}-${planIndex}`,
        provider: platform.name,
        rechargeType: type as any,
        plan: plan.plan,
        amount: finalAmount,
        validity: plan.validity,
        benefits: plan.benefits,
        features: [
          'Instant Recharge',
          'Secure Payment',
          `${platform.cashback}% Cashback`,
          '24/7 Support'
        ],
        url: platform.url,
        cashback: Math.round(finalAmount * platform.cashback / 100)
      });
    });
  });

  return results.sort((a, b) => (b.cashback || 0) - (a.cashback || 0));
};