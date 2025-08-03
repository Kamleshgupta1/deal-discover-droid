// Jobs API service using GitHub Jobs API (simulated)
// This provides job comparison across different platforms

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  type: string;
  experience: string;
  posted: string;
  url: string;
  logo?: string;
}

interface JobPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  jobCount: number;
  premium: boolean;
}

const jobPlatforms: JobPlatform[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/jobs',
    color: '#0077b5',
    features: ['Professional Network', 'Direct Apply', 'Salary Insights'],
    jobCount: 1000000,
    premium: true
  },
  {
    name: 'Indeed',
    url: 'https://indeed.com',
    color: '#003f7f',
    features: ['Wide Range', 'Company Reviews', 'Salary Calculator'],
    jobCount: 2000000,
    premium: false
  },
  {
    name: 'Glassdoor',
    url: 'https://glassdoor.com',
    color: '#0caa41',
    features: ['Company Reviews', 'Salary Data', 'Interview Tips'],
    jobCount: 800000,
    premium: true
  },
  {
    name: 'Naukri',
    url: 'https://naukri.com',
    color: '#4a90e2',
    features: ['India Focus', 'Resume Services', 'Job Alerts'],
    jobCount: 500000,
    premium: false
  },
  {
    name: 'AngelList',
    url: 'https://angel.co',
    color: '#000000',
    features: ['Startup Focus', 'Equity Details', 'Remote Work'],
    jobCount: 200000,
    premium: false
  }
];

class JobsApi {
  // Simulated job data since most job APIs require authentication
  private generateJobData(query: string): Job[] {
    const jobTitles = [
      'Software Engineer',
      'Data Scientist',
      'Product Manager',
      'UX Designer',
      'DevOps Engineer',
      'Full Stack Developer',
      'Marketing Manager',
      'Sales Executive'
    ];

    const companies = [
      'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta',
      'Netflix', 'Uber', 'Airbnb', 'Spotify', 'Slack'
    ];

    const locations = [
      'San Francisco, CA', 'New York, NY', 'Seattle, WA',
      'Austin, TX', 'Boston, MA', 'Remote', 'London, UK',
      'Bangalore, India', 'Toronto, Canada'
    ];

    const jobs: Job[] = [];
    
    for (let i = 0; i < 12; i++) {
      const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      const company = companies[Math.floor(Math.random() * companies.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      
      // Filter based on query
      if (query && !title.toLowerCase().includes(query.toLowerCase()) && 
          !company.toLowerCase().includes(query.toLowerCase())) {
        continue;
      }

      jobs.push({
        id: `job-${i}`,
        title,
        company,
        location,
        description: `Join ${company} as a ${title}. Great opportunity for career growth.`,
        salary: `$${(Math.random() * 100 + 50).toFixed(0)}K - $${(Math.random() * 150 + 100).toFixed(0)}K`,
        type: Math.random() > 0.5 ? 'Full-time' : 'Contract',
        experience: `${Math.floor(Math.random() * 5 + 1)}-${Math.floor(Math.random() * 3 + 3)} years`,
        posted: `${Math.floor(Math.random() * 7 + 1)} days ago`,
        url: `https://example.com/jobs/${i}`,
        logo: `https://logo.clearbit.com/${company.toLowerCase()}.com`
      });
    }

    return jobs.slice(0, 6);
  }

  async searchJobs(query: string): Promise<Job[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      return this.generateJobData(query);
    } catch (error) {
      console.error('Error searching jobs:', error);
      return [];
    }
  }

  getPlatforms(): JobPlatform[] {
    return jobPlatforms;
  }

  generatePlatformJobCount(basePlatform: JobPlatform, query: string): number {
    // Simulate different job counts per platform based on the query
    const variation = 0.7 + Math.random() * 0.6;
    return Math.floor(basePlatform.jobCount * variation * 0.001); // Scale down for display
  }
}

export const jobsApi = new JobsApi();