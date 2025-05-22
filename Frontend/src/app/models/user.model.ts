export interface User {
    id: number;
    email?: string;
    password: string;
    role: 'admin' | 'teacher' | 'student';
    name?: string;
    phone?: string;
    profession?: string;
    faculty?: string;
    teacherfaculty: string,
    studentfaculty: string,
    branch: string,
    department?: string;
    gpa?: number;
    Counselor: string
  }