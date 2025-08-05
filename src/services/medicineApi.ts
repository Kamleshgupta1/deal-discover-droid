interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  composition: string;
  type: string; // tablet, syrup, injection, etc.
  strength: string;
  packSize: string;
  mrp: number;
  prescriptionRequired: boolean;
  category: string;
  image: string;
  description: string;
}

interface PharmacyPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  deliveryFee: number;
  minimumOrder: number;
  discount: number;
  deliveryTime: string;
}

export class MedicineApi {
  private platforms: PharmacyPlatform[] = [
    {
      name: '1mg',
      url: 'https://1mg.com',
      color: '#ff6f61',
      features: ['Prescription Upload', 'Genuine Medicines', 'Expert Consultation'],
      deliveryFee: 25,
      minimumOrder: 99,
      discount: 0.15,
      deliveryTime: '2-3 hours'
    },
    {
      name: 'PharmEasy',
      url: 'https://pharmeasy.in',
      color: '#59d4cc',
      features: ['Online Doctor', 'Lab Tests', 'Medicine Reminder'],
      deliveryFee: 30,
      minimumOrder: 149,
      discount: 0.20,
      deliveryTime: '1-2 hours'
    },
    {
      name: 'Netmeds',
      url: 'https://netmeds.com',
      color: '#20b2aa',
      features: ['Health Articles', 'Wellness Products', 'Quick Delivery'],
      deliveryFee: 35,
      minimumOrder: 199,
      discount: 0.12,
      deliveryTime: '3-4 hours'
    },
    {
      name: 'Apollo Pharmacy',
      url: 'https://apollopharmacy.in',
      color: '#0066cc',
      features: ['Trusted Brand', 'Health Checkups', 'Store Pickup'],
      deliveryFee: 40,
      minimumOrder: 299,
      discount: 0.10,
      deliveryTime: '1-3 hours'
    },
    {
      name: 'MediBuddy',
      url: 'https://medibuddy.in',
      color: '#ff4081',
      features: ['Digital Health', 'Insurance Claims', 'Video Consultation'],
      deliveryFee: 20,
      minimumOrder: 199,
      discount: 0.18,
      deliveryTime: '2-4 hours'
    }
  ];

  async searchMedicines(query: string, location: string = 'Mumbai'): Promise<Medicine[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const commonMedicines = [
      {
        name: 'Paracetamol',
        genericName: 'Acetaminophen',
        manufacturer: 'Cipla',
        composition: 'Paracetamol 500mg',
        type: 'Tablet',
        strength: '500mg',
        packSize: '10 tablets',
        mrp: 25.50,
        prescriptionRequired: false,
        category: 'Pain Relief',
        description: 'Used for fever and mild to moderate pain relief'
      },
      {
        name: 'Crocin',
        genericName: 'Paracetamol',
        manufacturer: 'GSK',
        composition: 'Paracetamol 650mg',
        type: 'Tablet',
        strength: '650mg',
        packSize: '15 tablets',
        mrp: 42.00,
        prescriptionRequired: false,
        category: 'Pain Relief',
        description: 'Fast relief from fever and headache'
      },
      {
        name: 'Dolo',
        genericName: 'Paracetamol',
        manufacturer: 'Micro Labs',
        composition: 'Paracetamol 650mg',
        type: 'Tablet',
        strength: '650mg',
        packSize: '15 tablets',
        mrp: 38.50,
        prescriptionRequired: false,
        category: 'Pain Relief',
        description: 'Effective pain reliever and fever reducer'
      },
      {
        name: 'Aspirin',
        genericName: 'Acetylsalicylic acid',
        manufacturer: 'Bayer',
        composition: 'Aspirin 325mg',
        type: 'Tablet',
        strength: '325mg',
        packSize: '10 tablets',
        mrp: 18.75,
        prescriptionRequired: false,
        category: 'Pain Relief',
        description: 'Pain relief and heart health'
      },
      {
        name: 'Cetirizine',
        genericName: 'Cetirizine Hydrochloride',
        manufacturer: 'Dr. Reddy\'s',
        composition: 'Cetirizine 10mg',
        type: 'Tablet',
        strength: '10mg',
        packSize: '10 tablets',
        mrp: 32.40,
        prescriptionRequired: false,
        category: 'Allergy',
        description: 'Antihistamine for allergy relief'
      },
      {
        name: 'Azithromycin',
        genericName: 'Azithromycin',
        manufacturer: 'Pfizer',
        composition: 'Azithromycin 500mg',
        type: 'Tablet',
        strength: '500mg',
        packSize: '3 tablets',
        mrp: 127.50,
        prescriptionRequired: true,
        category: 'Antibiotic',
        description: 'Antibiotic for bacterial infections'
      },
      {
        name: 'Omeprazole',
        genericName: 'Omeprazole',
        manufacturer: 'Cadila Healthcare',
        composition: 'Omeprazole 20mg',
        type: 'Capsule',
        strength: '20mg',
        packSize: '10 capsules',
        mrp: 65.30,
        prescriptionRequired: false,
        category: 'Acidity',
        description: 'Proton pump inhibitor for acidity'
      },
      {
        name: 'Metformin',
        genericName: 'Metformin Hydrochloride',
        manufacturer: 'Sun Pharma',
        composition: 'Metformin 500mg',
        type: 'Tablet',
        strength: '500mg',
        packSize: '20 tablets',
        mrp: 89.75,
        prescriptionRequired: true,
        category: 'Diabetes',
        description: 'Diabetes medication for blood sugar control'
      }
    ];

    const searchLower = query.toLowerCase();
    const filteredMedicines = commonMedicines.filter(medicine =>
      medicine.name.toLowerCase().includes(searchLower) ||
      medicine.genericName.toLowerCase().includes(searchLower) ||
      medicine.category.toLowerCase().includes(searchLower) ||
      medicine.composition.toLowerCase().includes(searchLower)
    );

    return filteredMedicines.map((medicine, idx) => ({
      ...medicine,
      id: `med-${idx}`,
      image: `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=150&fit=crop&auto=format&q=60&ixid=${idx}`
    }));
  }

  async getMedicineDetails(medicineId: string): Promise<Medicine | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // This would typically fetch detailed information about a specific medicine
    return null;
  }

  getPlatforms(): PharmacyPlatform[] {
    return this.platforms;
  }

  generatePlatformPrice(basePrice: number, platform: PharmacyPlatform): number {
    // Apply platform discount and add delivery fee if order is below minimum
    const discountedPrice = basePrice * (1 - platform.discount);
    const deliveryCharge = basePrice < platform.minimumOrder ? platform.deliveryFee : 0;
    
    return Math.round((discountedPrice + deliveryCharge) * 100) / 100;
  }

  checkPrescriptionRequired(medicine: Medicine): boolean {
    return medicine.prescriptionRequired;
  }
}

export const medicineApi = new MedicineApi();