import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SecurityHeaders } from "@/components/security/SecurityHeaders";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { PageTranslator } from "@/components/features/PageTranslator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Index from "./pages/Index";
import AllCategories from "./pages/AllCategories";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Dashboard } from "./pages/admin/Dashboard";
import { PostEditor } from "./pages/admin/PostEditor";
import { PrivacyPolicy } from "./pages/legal/PrivacyPolicy";
import { TermsOfService } from "./pages/legal/TermsOfService";
import { ContactUs } from "./pages/ContactUs";
import { BlogListing } from "./pages/BlogListing";
import { BlogPost } from "./pages/BlogPost";
import { CategoryBlog } from "./pages/CategoryBlog";
import { TagBlog } from "./pages/TagBlog";
import { AuthorProfile } from "./pages/AuthorProfile";
import { UserProfile } from "./pages/UserProfile";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { useLanguage } from '@/hooks/useLanguage';

const queryClient = new QueryClient();

// Language synchronization component
const LanguageSync = () => {
  const { currentLanguage } = useLanguage();
  
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);
  
  return null;
};

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <SecurityHeaders />
            <Toaster />
            <Sonner />
            <InstallPrompt />
            <PageTranslator />
            <LanguageSync />
            <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                <Route path="/" element={<Index />} />
                  <Route path="/categories" element={<AllCategories />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/blog" element={<BlogListing />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/category/:slug" element={<CategoryBlog />} />
                <Route path="/tag/:slug" element={<TagBlog />} />
                <Route path="/author/:authorId" element={<AuthorProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/posts/new" element={<PostEditor />} />
                <Route path="/admin/posts/edit/:id" element={<PostEditor />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
