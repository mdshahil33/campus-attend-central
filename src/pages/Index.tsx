
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { QrCode, ClipboardCheck, Calendar, UserCheck } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const features = [
    {
      title: "QR Code Check-in",
      description: "Students can quickly check in to classes by scanning a QR code displayed by the instructor.",
      icon: QrCode,
      color: "bg-campus-primary",
    },
    {
      title: "Attendance Tracking",
      description: "Comprehensive attendance records for every class session with detailed analytics.",
      icon: ClipboardCheck,
      color: "bg-campus-secondary",
    },
    {
      title: "Schedule Management",
      description: "Easily view and manage class schedules, locations, and attendance sessions.",
      icon: Calendar,
      color: "bg-campus-accent",
    },
    {
      title: "Role-Based Access",
      description: "Different interfaces for administrators, faculty, and students with appropriate permissions.",
      icon: UserCheck,
      color: "bg-campus-neutral",
    },
  ];

  // Rotate through features every 5 seconds
  setTimeout(() => {
    setActiveFeature((activeFeature + 1) % features.length);
  }, 5000);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-campus-primary" />
            <span className="text-xl font-bold text-campus-primary">Campus Attend</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Information */}
        <div className="w-full md:w-3/5 bg-gradient-to-br from-campus-primary to-campus-dark-blue text-white flex items-center">
          <div className="px-6 py-12 md:px-12 md:py-24 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Smart Attendance Tracking for Modern Campuses
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Streamline attendance tracking across your institution with a seamless digital solution for administrators, faculty, and students.
            </p>
            
            {/* Feature highlights */}
            <div className="space-y-4 mb-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg transition-all duration-500 flex items-start gap-4 ${
                    index === activeFeature ? "bg-white/10 scale-105" : "opacity-70"
                  }`}
                >
                  <div className={`p-2 rounded-md ${feature.color}`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{feature.title}</h3>
                    <p className="text-sm text-white/80">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right side - Login */}
        <div className="w-full md:w-2/5 bg-gray-50 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© 2025 Campus Attend Central. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
