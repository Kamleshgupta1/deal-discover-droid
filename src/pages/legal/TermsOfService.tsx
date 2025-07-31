import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Shield, FileText, Clock, Mail } from 'lucide-react';

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild className="animate-fade-in">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="animate-slide-up space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Terms of Service
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Last updated: January 2024
            </p>
          </div>

          {/* Terms Content */}
          <Card className="shadow-elegant border-border/50">
            <CardContent className="p-8 space-y-8">
              {/* Agreement */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  Agreement to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using CompareAll ("the Service"), you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, you are 
                  prohibited from using this service.
                </p>
              </section>

              <Separator />

              {/* Use License */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Use License</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Permission is granted to temporarily use CompareAll for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained in the service</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              <Separator />

              {/* Service Description */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Service Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  CompareAll is a price comparison platform that aggregates product information and pricing from 
                  various e-commerce platforms. We provide tools to help users find the best deals across multiple 
                  retailers. The service is provided "as is" and we make no warranties about the accuracy of pricing 
                  or product information.
                </p>
              </section>

              <Separator />

              {/* User Responsibilities */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">User Responsibilities</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>As a user of our service, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate information when creating an account</li>
                    <li>Keep your account credentials secure</li>
                    <li>Use the service only for lawful purposes</li>
                    <li>Not attempt to disrupt or interfere with the service</li>
                    <li>Respect the intellectual property rights of others</li>
                  </ul>
                </div>
              </section>

              <Separator />

              {/* Privacy and Data */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Privacy and Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use 
                  of the service, to understand our practices. We collect and use information in accordance with 
                  our Privacy Policy.
                </p>
              </section>

              <Separator />

              {/* Disclaimers */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Disclaimers</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, CompareAll:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Excludes all representations and warranties relating to this service</li>
                    <li>Does not guarantee the accuracy of pricing information</li>
                    <li>Is not responsible for transactions between users and third-party retailers</li>
                    <li>Makes no warranties about the availability or functionality of external links</li>
                  </ul>
                </div>
              </section>

              <Separator />

              {/* Limitations */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Limitations of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall CompareAll or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                  to use the service, even if CompareAll or its authorized representative has been notified orally or in 
                  writing of the possibility of such damage.
                </p>
              </section>

              <Separator />

              {/* Modifications */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Terms Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  CompareAll may revise these terms of service at any time without notice. By using this service, 
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <Separator />

              {/* Contact */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                  <br />
                  <strong className="text-foreground">Email:</strong> legal@compareall.com
                  <br />
                  <strong className="text-foreground">Address:</strong> 123 Tech Street, San Francisco, CA 94102
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};