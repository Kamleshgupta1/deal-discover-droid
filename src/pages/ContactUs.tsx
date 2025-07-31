import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  HeadphonesIcon,
  Users
} from 'lucide-react';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email anytime',
      contact: 'support@compareall.com',
      color: 'text-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us during business hours',
      contact: '+1 (555) 123-4567',
      color: 'text-green-500'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available 24/7',
      color: 'text-purple-500'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      description: 'Visit our headquarters',
      contact: '123 Tech Street, San Francisco, CA',
      color: 'text-red-500'
    }
  ];

  const supportCategories = [
    {
      icon: HeadphonesIcon,
      title: 'Technical Support',
      description: 'Get help with technical issues'
    },
    {
      icon: Users,
      title: 'General Inquiries',
      description: 'Questions about our service'
    },
    {
      icon: MessageCircle,
      title: 'Feedback',
      description: 'Share your thoughts and suggestions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Contact Us
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help! Reach out to us through any of the channels below.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-scale">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <method.icon className={`h-6 w-6 ${method.color}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                    <p className="text-sm font-medium text-primary">{method.contact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Send className="h-5 w-5 text-primary" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this about?"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full btn-gradient"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Support Categories & Info */}
            <div className="space-y-6">
              {/* Support Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Support Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportCategories.map((category, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <category.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{category.title}</h4>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium text-red-500">Closed</span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      For urgent matters outside business hours, please use our live chat or email support.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="bg-gradient-primary text-white">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="font-semibold">Need Quick Answers?</h3>
                  <p className="text-sm opacity-90">
                    Check out our FAQ section for instant answers to common questions.
                  </p>
                  <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
                    Visit FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};