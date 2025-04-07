
export type Role = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  facultyName: string;
  schedule: string;
  location: string;
  students: string[];
}

export interface AttendanceRecord {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  startTime: string;
  endTime: string;
  active: boolean;
  qrCode?: string;
}

export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
}
