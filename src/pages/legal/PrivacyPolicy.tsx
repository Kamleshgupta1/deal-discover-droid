import { Card } from '@/components/ui/card';
import { APP_CONFIG } from '@/constants';

export const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p>We collect information to provide better services to our users.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Information</h2>
            <p>We use the information we collect to maintain and improve our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at privacy@{APP_CONFIG.name.toLowerCase()}.com</p>
          </section>
        </div>
      </Card>
    </div>
  );
};