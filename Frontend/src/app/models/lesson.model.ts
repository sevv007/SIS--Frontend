export interface Course {
    id: number
    name: string;
    approved: boolean;
    note: string; // A, B, C gibi
    day: string;
    time: string;
    credit?: number;
    selected?: boolean;
    classLevel: string;
    studentEmail?: string;
    teacherEmail?: string;
    adminEmail?: string;
  }
  