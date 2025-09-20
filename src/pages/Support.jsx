import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  MessageCircle, 
  Shield, 
  Users, 
  HelpCircle, 
  Mail, 
  Phone, 
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
  Search
} from "lucide-react";

const Support = () => {
  const [activeTab, setActiveTab] = useState('faqs');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const supportSections = [
    {
      id: 'faqs',
      title: 'FAQs',
      icon: HelpCircle,
      description: 'Find answers to common questions'
    },
    {
      id: 'trust-safety',
      title: 'Trust & Safety',
      icon: Shield,
      description: 'Learn about our security measures'
    },
    {
      id: 'contact',
      title: 'Contact Support',
      icon: MessageCircle,
      description: 'Get personalized help from our team'
    },
    {
      id: 'community',
      title: 'Community Guidelines',
      icon: Users,
      description: 'Our community standards and policies'
    }
  ];

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I sign up for RentiGoo?',
          answer: 'Signing up is easy! Click the "Get Started" button on our homepage, fill in your details, and verify your email address. You can start browsing items immediately.'
        },
        {
          question: 'Is RentiGoo free to use?',
          answer: 'Yes, creating an account and browsing items is completely free. We only charge a small service fee when you successfully complete a rental transaction.'
        },
        {
          question: 'What can I rent on RentiGoo?',
          answer: 'You can rent a wide variety of items including electronics, furniture, tools, vehicles, photography equipment, gaming gear, and much more from verified community members.'
        }
      ]
    },
    {
      category: 'Rentals & Bookings',
      questions: [
        {
          question: 'How do I book an item?',
          answer: 'Browse our listings, select your desired item, choose your rental dates, provide delivery details, and complete the secure payment process. You\'ll receive a confirmation email with all details.'
        },
        {
          question: 'Can I cancel my booking?',
          answer: 'Yes, you can cancel bookings according to our cancellation policy. Free cancellation is available up to 24 hours before your rental start date.'
        },
        {
          question: 'What if an item gets damaged?',
          answer: 'We offer optional damage protection insurance. If damage occurs, report it immediately through our platform. Our team will guide you through the resolution process.'
        }
      ]
    },
    {
      category: 'Listing Items',
      questions: [
        {
          question: 'How do I list my items?',
          answer: 'Click "Create Listing" in the navigation, fill out the multi-step form with item details, upload photos, set your pricing, and publish. Our team reviews all listings for quality.'
        },
        {
          question: 'How much can I earn?',
          answer: 'Earnings vary by item type and demand. Our pricing suggestions help you set competitive rates. Many users earn ₹8,000-42,000+ monthly by renting out items they don\'t use daily.'
        },
        {
          question: 'When do I get paid?',
          answer: 'Payments are processed automatically after successful rental completion. Funds are typically available in your account within 2-3 business days.'
        }
      ]
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for contacting us! We\'ll get back to you within 24 hours.');
  };

  const renderFAQs = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Quick answers to common questions about RentiGoo</p>
      </div>

      {faqs.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h3 className="text-xl font-bold text-foreground border-b border-primary/20 pb-2">
            {category.category}
          </h3>
          <div className="space-y-3">
            {category.questions.map((faq, faqIndex) => {
              const faqId = `${categoryIndex}-${faqIndex}`;
              const isExpanded = expandedFAQ === faqId;
              
              return (
                <Card key={faqIndex} className="border border-primary/10">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFAQ(isExpanded ? null : faqId)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
                    >
                      <span className="font-semibold text-foreground">{faq.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTrustSafety = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Trust & Safety</h2>
        <p className="text-muted-foreground">Your security and peace of mind are our top priorities</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              Verified Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              All users go through our verification process including ID verification, phone number confirmation, and background checks for high-value items.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              Secure Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              All payments are processed through encrypted, PCI-compliant systems. Your financial information is never stored on our servers.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              Insurance Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Optional damage protection insurance covers both renters and owners. Claims are handled quickly and fairly by our specialized team.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              24/7 Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Our support team is available around the clock to help resolve any issues and ensure smooth rental experiences for everyone.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Contact Support</h2>
        <p className="text-muted-foreground">Get personalized help from our expert support team</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Name *</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-border rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Email *</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-border rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Subject *</label>
                <select
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full p-3 border border-border rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="booking-issue">Booking Issue</option>
                  <option value="payment-problem">Payment Problem</option>
                  <option value="listing-question">Listing Question</option>
                  <option value="account-help">Account Help</option>
                  <option value="technical-issue">Technical Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Message *</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full p-3 border border-border rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Please describe your issue or question in detail..."
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-hover">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="border border-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Email Support</h3>
                  <p className="text-muted-foreground">support@rentigoo.com</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">We typically respond within 2-4 hours during business hours.</p>
            </CardContent>
          </Card>

          <Card className="border border-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Phone Support</h3>
                  <p className="text-muted-foreground">1-800-RENTIGOO</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Available Monday-Friday, 9 AM - 6 PM EST</p>
            </CardContent>
          </Card>

          <Card className="border border-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Emergency Support</h3>
                  <p className="text-muted-foreground">24/7 for urgent issues</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">For rental emergencies, safety concerns, or payment disputes.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderCommunityGuidelines = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Community Guidelines</h2>
        <p className="text-muted-foreground">Building a safe and respectful community for everyone</p>
      </div>

      <div className="space-y-6">
        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Respect & Communication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              • Treat all community members with respect and courtesy
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Communicate promptly and honestly about item conditions and availability
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Use appropriate language in all interactions and listings
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Respond to messages and booking requests in a timely manner
            </p>
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Item Standards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              • Only list items you legally own and have the right to rent
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Provide accurate descriptions and high-quality photos
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Ensure items are clean, functional, and safe to use
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Prohibited items include weapons, illegal substances, and recalled products
            </p>
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Safety & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              • Meet in safe, public locations for item exchanges when possible
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Verify user identity before completing transactions
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Report suspicious activity or safety concerns immediately
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Keep all communications and transactions within the RentiGoo platform
            </p>
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Consequences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Violations of our community guidelines may result in:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Warning and education about proper platform use
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Temporary suspension of account privileges
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Permanent account termination for serious or repeated violations
            </p>
            <p className="text-muted-foreground leading-relaxed">
              • Legal action when necessary to protect our community
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'faqs': return renderFAQs();
      case 'trust-safety': return renderTrustSafety();
      case 'contact': return renderContact();
      case 'community': return renderCommunityGuidelines();
      default: return renderFAQs();
    }
  };

  return (
    <Layout>
      {/* Hero Section - matching Browse page style */}
      <section className="relative pt-8 pb-12 md:pt-16 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-hero text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">Support</span>{' '}
              <span className="text-foreground">Center</span>
            </h1>
            <p className="text-body-large text-muted-foreground leading-relaxed">
              Get help, find answers, and learn about staying safe on RentiGoo
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="relative pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {supportSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === section.id 
                        ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg' 
                        : 'glass-card border border-primary/20 text-foreground hover:border-primary/40'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-semibold">{section.title}</div>
                      <div className="text-xs opacity-80">{section.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="glass-card rounded-2xl border border-primary/10 p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
