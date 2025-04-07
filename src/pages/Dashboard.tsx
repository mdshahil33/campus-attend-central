
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import CourseCard from "@/components/dashboard/CourseCard";
import AttendanceQRCode from "@/components/dashboard/AttendanceQRCode";
import AttendanceScanner from "@/components/dashboard/AttendanceScanner";
import AttendanceTable from "@/components/dashboard/AttendanceTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, BookOpen, ClipboardCheck, PieChart, 
  Calendar, QrCode, Clock, UserCheck 
} from "lucide-react";
import { 
  courses, getCoursesByFaculty, getCoursesByStudent, 
  attendanceRecords, getAttendanceByStudent, getAttendanceByCourse,
  attendanceSessions 
} from "@/lib/dummy-data";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Statistics based on user role
  const renderStats = () => {
    if (user.role === "admin") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Users" 
            value="245" 
            icon={Users} 
            trend="up" 
            trendValue="12% from last month" 
            iconColor="bg-campus-primary"
          />
          <StatCard 
            title="Active Courses" 
            value="32" 
            icon={BookOpen} 
            iconColor="bg-campus-secondary"
          />
          <StatCard 
            title="Attendance Rate" 
            value="87%" 
            icon={ClipboardCheck} 
            trend="up" 
            trendValue="3% from last week" 
            iconColor="bg-campus-accent"
          />
          <StatCard 
            title="Departments" 
            value="8" 
            icon={PieChart} 
            iconColor="bg-campus-neutral"
          />
        </div>
      );
    }

    if (user.role === "faculty") {
      const facultyCourses = getCoursesByFaculty(user.id);
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard 
            title="My Courses" 
            value={facultyCourses.length.toString()} 
            icon={BookOpen} 
            iconColor="bg-campus-primary"
          />
          <StatCard 
            title="Total Students" 
            value="68" 
            icon={Users} 
            iconColor="bg-campus-secondary"
          />
          <StatCard 
            title="Avg. Attendance" 
            value="89%" 
            trend="down" 
            trendValue="2% from last week"
            icon={ClipboardCheck} 
            iconColor="bg-campus-accent"
          />
        </div>
      );
    }

    // Student role
    const studentCourses = getCoursesByStudent(user.id);
    const studentAttendance = getAttendanceByStudent(user.id);
    const presentCount = studentAttendance.filter(record => record.status === "present").length;
    const attendanceRate = studentAttendance.length > 0 
      ? Math.round((presentCount / studentAttendance.length) * 100) 
      : 0;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="My Classes" 
          value={studentCourses.length.toString()} 
          icon={BookOpen} 
          iconColor="bg-campus-primary"
        />
        <StatCard 
          title="My Attendance" 
          value={`${attendanceRate}%`} 
          icon={UserCheck} 
          iconColor="bg-campus-secondary"
        />
        <StatCard 
          title="Upcoming Class" 
          value="CS101" 
          description="In 30 minutes"
          icon={Clock} 
          iconColor="bg-campus-accent"
        />
        <StatCard 
          title="This Week" 
          value="12 Classes" 
          icon={Calendar} 
          iconColor="bg-campus-neutral"
        />
      </div>
    );
  };

  // Dashboard content based on user role
  const renderRoleContent = () => {
    if (user.role === "admin") {
      return (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>
                    Campus-wide attendance system status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">System Status</span>
                      <span className="text-sm font-medium">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Sessions</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Check-ins Today</span>
                      <span className="text-sm font-medium">187</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Last System Update</span>
                      <span className="text-sm font-medium">Today, 2:30 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest system events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Activity log items */}
                    <div className="border-l-2 border-campus-primary pl-3 py-1">
                      <div className="text-sm font-medium">CS101 Attendance Session Started</div>
                      <div className="text-xs text-muted-foreground">Today, 10:00 AM - Professor Smith</div>
                    </div>
                    <div className="border-l-2 border-campus-secondary pl-3 py-1">
                      <div className="text-sm font-medium">New User Registered</div>
                      <div className="text-xs text-muted-foreground">Today, 9:45 AM - Michael Johnson (Student)</div>
                    </div>
                    <div className="border-l-2 border-campus-accent pl-3 py-1">
                      <div className="text-sm font-medium">CS201 Attendance Reports Generated</div>
                      <div className="text-xs text-muted-foreground">Yesterday, 3:20 PM - System</div>
                    </div>
                    <div className="border-l-2 border-muted pl-3 py-1">
                      <div className="text-sm font-medium">System Maintenance Completed</div>
                      <div className="text-xs text-muted-foreground">Yesterday, 1:15 AM - Admin</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onViewAttendance={() => console.log(`View attendance for ${course.id}`)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="attendance">
            <AttendanceTable 
              records={attendanceRecords} 
              title="Recent Attendance Records"
            />
          </TabsContent>
        </Tabs>
      );
    }

    if (user.role === "faculty") {
      const facultyCourses = getCoursesByFaculty(user.id);
      const activeSession = attendanceSessions.find(session => session.active);
      
      return (
        <div className="space-y-6">
          {activeSession ? (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Active Attendance Session</h2>
              <AttendanceQRCode 
                session={activeSession} 
                onEnd={() => console.log("End session")}
              />
            </div>
          ) : null}
          
          <div>
            <h2 className="text-xl font-bold mb-4">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {facultyCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onTakeAttendance={() => console.log(`Take attendance for ${course.id}`)}
                  onViewAttendance={() => console.log(`View attendance for ${course.id}`)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Attendance Records</h2>
            <AttendanceTable 
              records={facultyCourses.flatMap(course => getAttendanceByCourse(course.id))}
            />
          </div>
        </div>
      );
    }

    // Student role
    const studentCourses = getCoursesByStudent(user.id);
    const studentAttendance = getAttendanceByStudent(user.id);
    
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Check-in to Class</h2>
          <AttendanceScanner />
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">My Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onViewAttendance={() => console.log(`View attendance for ${course.id}`)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">My Attendance History</h2>
          <AttendanceTable 
            records={studentAttendance}
          />
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="mt-2 mb-6">
        <h1 className="text-2xl font-bold">
          Welcome back, {user.name}!
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {renderStats()}
      {renderRoleContent()}
    </Layout>
  );
}
