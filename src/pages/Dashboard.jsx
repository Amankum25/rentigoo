import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../contexts/AuthContext";
import { 
  User, 
  Package, 
  Calendar, 
  IndianRupee, 
  MessageCircle,
  Bell,
  Edit,
  Eye,
  Plus,
  TrendingUp,
  Star,
  CreditCard,
  Search
} from "lucide-react";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [userBookings, setUserBookings] = useState([]);
  const [userListings, setUserListings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [messages, setMessages] = useState([]);

  const dashboardSections = [
    { id: 'overview', title: 'Overview', icon: TrendingUp },
    { id: 'rentals', title: 'My Rentals', icon: Calendar },
    { id: 'listings', title: 'My Listings', icon: Package },
    { id: 'transactions', title: 'Transactions', icon: IndianRupee },
    { id: 'messages', title: 'Messages', icon: MessageCircle },
    { id: 'profile', title: 'Profile', icon: User }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access dashboard");
      navigate("/", { replace: true });
      return;
    }

    loadUserData();

    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [isAuthenticated, navigate, user, location.state]);

  const loadUserData = () => {
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const userSpecificBookings = bookings.filter(booking => booking.userId === user?.id);
    setUserBookings(userSpecificBookings);

    const listings = JSON.parse(localStorage.getItem('rentigoo_listings') || '[]');
    const userSpecificListings = listings.filter(listing => listing.userId === user?.id);
    setUserListings(userSpecificListings);

    setNotifications([
      { id: 1, type: 'booking', title: 'New booking request', message: 'Someone wants to rent your camera', time: '2 hours ago', unread: true },
      { id: 2, type: 'payment', title: 'Payment received', message: '₹45.00 from John Doe', time: '1 day ago', unread: false },
      { id: 3, type: 'review', title: 'New review', message: 'You received a 5-star review!', time: '3 days ago', unread: false }
    ]);

    setTransactions([
      { id: 1, type: 'earning', amount: 45.00, description: 'Rental payment for Vintage Camera', date: '2024-01-15', status: 'completed' },
      { id: 2, type: 'fee', amount: -4.50, description: 'Service fee', date: '2024-01-15', status: 'completed' },
      { id: 3, type: 'rental', amount: -25.00, description: 'Rental payment for Mountain Bike', date: '2024-01-10', status: 'completed' }
    ]);

    setMessages([
      { id: 1, sender: 'John Doe', message: 'Hi, is the camera still available?', time: '10 mins ago', unread: true },
      { id: 2, sender: 'Sarah Wilson', message: 'Thanks for the great rental experience!', time: '2 hours ago', unread: false },
      { id: 3, sender: 'Mike Johnson', message: 'Can we extend the rental by one day?', time: '1 day ago', unread: false }
    ]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-muted-foreground">Here's what's happening with your RentiGoo account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Rentals</p>
                <p className="text-2xl font-bold text-foreground">{userBookings.filter(b => b.status === 'confirmed').length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">My Listings</p>
                <p className="text-2xl font-bold text-foreground">{userListings.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-foreground">
                  ₹{transactions.filter(t => t.type === 'earning').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-2xl font-bold text-foreground">{messages.filter(m => m.unread).length}</p>
                <p className="text-xs text-muted-foreground">Unread</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Rentals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userBookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 glass-card rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{booking.listingTitle}</h4>
                  <p className="text-sm text-muted-foreground">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
                </div>
                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
              </div>
            ))}
            {userBookings.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No rentals yet. <Button variant="link" onClick={() => navigate('/browse')}>Start browsing</Button>
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className={`p-4 glass-card rounded-lg ${notification.unread ? 'border-l-4 border-primary' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {notification.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'rentals': return <div className="text-center text-muted-foreground py-12">Rentals section coming soon...</div>;
      case 'listings': return <div className="text-center text-muted-foreground py-12">Listings section coming soon...</div>;
      case 'transactions': return <div className="text-center text-muted-foreground py-12">Transactions section coming soon...</div>;
      case 'messages': return <div className="text-center text-muted-foreground py-12">Messages section coming soon...</div>;
      case 'profile': return <div className="text-center text-muted-foreground py-12">Profile section coming soon...</div>;
      default: return renderOverview();
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <section className="relative pt-8 pb-12 md:pt-16 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {dashboardSections.map((section) => {
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
                    {section.title}
                  </button>
                );
              })}
            </div>

            <div className="glass-card rounded-2xl border border-primary/10 p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;