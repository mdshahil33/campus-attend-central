
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  BookOpen, 
  CalendarDays, 
  BarChart, 
  Settings, 
  QrCode, 
  ClipboardCheck 
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { user } = useAuth();

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { 
        name: "Dashboard", 
        icon: BarChart, 
        href: "/dashboard" 
      },
    ];

    if (!user) return commonItems;

    if (user.role === "admin") {
      return [
        ...commonItems,
        { 
          name: "Users", 
          icon: Users, 
          href: "/users" 
        },
        { 
          name: "Courses", 
          icon: BookOpen, 
          href: "/courses" 
        },
        {
          name: "Attendance Reports",
          icon: ClipboardCheck,
          href: "/reports"
        },
        { 
          name: "Settings", 
          icon: Settings, 
          href: "/settings" 
        },
      ];
    }

    if (user.role === "faculty") {
      return [
        ...commonItems,
        { 
          name: "My Courses", 
          icon: BookOpen, 
          href: "/my-courses" 
        },
        {
          name: "Take Attendance",
          icon: QrCode,
          href: "/take-attendance"
        },
        {
          name: "Attendance Records",
          icon: ClipboardCheck,
          href: "/attendance-records"
        },
      ];
    }

    // Student role
    return [
      ...commonItems,
      { 
        name: "My Classes", 
        icon: BookOpen, 
        href: "/my-classes" 
      },
      {
        name: "Check-in",
        icon: QrCode,
        href: "/check-in"
      },
      {
        name: "My Attendance",
        icon: CalendarDays,
        href: "/my-attendance"
      },
    ];
  };

  const navItems = getNavItems();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-sidebar transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="py-6">
        <div className="flex items-center justify-center gap-2 px-4 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <ClipboardCheck className="w-6 h-6 text-sidebar-primary" />
          </div>
          <span className="text-lg font-semibold text-white">Campus Attend</span>
        </div>
        
        <Separator className="bg-sidebar-border mb-6" />
        
        <nav className="space-y-2 px-2">
          {navItems.map((item) => (
            <Link to={item.href} key={item.name}>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-sidebar-accent hover:text-white"
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
