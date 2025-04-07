
import { User, Course, AttendanceRecord, AttendanceSession } from "@/types";

// Mock users data
export const users: User[] = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@campus.edu",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=1E88E5&color=fff",
  },
  {
    id: "u2",
    name: "Professor Smith",
    email: "smith@campus.edu",
    role: "faculty",
    avatar: "https://ui-avatars.com/api/?name=Professor+Smith&background=26A69A&color=fff",
  },
  {
    id: "u3",
    name: "Jane Student",
    email: "jane@campus.edu",
    role: "student",
    avatar: "https://ui-avatars.com/api/?name=Jane+Student&background=81C784&color=fff",
  },
  {
    id: "u4",
    name: "John Student",
    email: "john@campus.edu",
    role: "student",
    avatar: "https://ui-avatars.com/api/?name=John+Student&background=81C784&color=fff",
  },
];

// Mock courses data
export const courses: Course[] = [
  {
    id: "c1",
    name: "Introduction to Computer Science",
    code: "CS101",
    facultyId: "u2",
    facultyName: "Professor Smith",
    schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
    location: "Building A, Room 101",
    students: ["u3", "u4"],
  },
  {
    id: "c2",
    name: "Data Structures and Algorithms",
    code: "CS201",
    facultyId: "u2",
    facultyName: "Professor Smith",
    schedule: "Tue, Thu 1:00 PM - 2:30 PM",
    location: "Building B, Room 203",
    students: ["u3"],
  },
  {
    id: "c3",
    name: "Web Development",
    code: "CS301",
    facultyId: "u2",
    facultyName: "Professor Smith",
    schedule: "Tue, Thu 3:00 PM - 4:30 PM",
    location: "Building C, Room 305",
    students: ["u4"],
  },
];

// Mock attendance records data
export const attendanceRecords: AttendanceRecord[] = [
  {
    id: "ar1",
    courseId: "c1",
    courseName: "Introduction to Computer Science",
    date: "2025-04-05",
    studentId: "u3",
    studentName: "Jane Student",
    status: "present",
    checkInTime: "10:05 AM",
  },
  {
    id: "ar2",
    courseId: "c1",
    courseName: "Introduction to Computer Science",
    date: "2025-04-05",
    studentId: "u4",
    studentName: "John Student",
    status: "late",
    checkInTime: "10:20 AM",
  },
  {
    id: "ar3",
    courseId: "c2",
    courseName: "Data Structures and Algorithms",
    date: "2025-04-04",
    studentId: "u3",
    studentName: "Jane Student",
    status: "present",
    checkInTime: "1:02 PM",
  },
  {
    id: "ar4",
    courseId: "c3",
    courseName: "Web Development",
    date: "2025-04-04",
    studentId: "u4",
    studentName: "John Student",
    status: "absent",
  },
];

// Mock attendance sessions data
export const attendanceSessions: AttendanceSession[] = [
  {
    id: "as1",
    courseId: "c1",
    courseName: "Introduction to Computer Science",
    date: "2025-04-07",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    active: true,
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=session_c1_20250407",
  },
  {
    id: "as2",
    courseId: "c2",
    courseName: "Data Structures and Algorithms",
    date: "2025-04-07",
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    active: false,
  },
];

// Function to get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

// Function to get courses by faculty ID
export const getCoursesByFaculty = (facultyId: string): Course[] => {
  return courses.filter(course => course.facultyId === facultyId);
};

// Function to get courses by student ID
export const getCoursesByStudent = (studentId: string): Course[] => {
  return courses.filter(course => course.students.includes(studentId));
};

// Function to get attendance records by student ID
export const getAttendanceByStudent = (studentId: string): AttendanceRecord[] => {
  return attendanceRecords.filter(record => record.studentId === studentId);
};

// Function to get attendance records by course ID
export const getAttendanceByCourse = (courseId: string): AttendanceRecord[] => {
  return attendanceRecords.filter(record => record.courseId === courseId);
};

// Function to get active attendance session by course ID
export const getActiveSessionByCourse = (courseId: string): AttendanceSession | undefined => {
  return attendanceSessions.find(session => session.courseId === courseId && session.active);
};
