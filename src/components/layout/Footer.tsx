import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  Shield,
  Clock,
  Award
} from 'lucide-react';
import { APP_CONFIG } from '@/constants';
import appIcon from '@/assets/app-icon.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'How it Works', path: '/how-it-works' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Live Chat', path: '/chat' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Disclaimer', path: '/disclaimer' },
    ],
    features: [
      { label: 'Price Comparison', path: '/features/comparison' },
      { label: 'Deal Alerts', path: '/features/alerts' },
      { label: 'Mobile App', path: '/app' },
      { label: 'API Access', path: '/api' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const features = [
    { icon: Shield, text: 'Secure & Trusted' },
    { icon: Clock, text: 'Real-time Updates' },
    { icon: Award, text: 'Best Deals Guaranteed' },
  ];

  return (
    <footer className="bg-gradient-subtle border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <img src={appIcon} alt={APP_CONFIG.name} className="w-10 h-10 rounded-xl" />
                <span className="font-bold text-2xl bg-gradient-hero bg-clip-text text-transparent">
                  {APP_CONFIG.name}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                {APP_CONFIG.description} Save time and money by comparing prices across 
                multiple platforms in one place.
              </p>

              {/* Features */}
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Platform Stats</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-lg font-bold text-primary">50K+</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-lg font-bold text-primary">25+</div>
                    <div className="text-xs text-muted-foreground">Platforms</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-foreground">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-foreground">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-foreground">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear} {APP_CONFIG.name}. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> for smart shoppers
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:inline">Follow us:</span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@compareall.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};