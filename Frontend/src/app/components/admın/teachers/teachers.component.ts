import { Component ,OnInit} from '@angular/core';
import { AdminCoursesService } from '../../../services/admin.courses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-teachers',
  imports: [CommonModule,FormsModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
  allStudentCourses: any[] = [];
  filteredCourses: any[] = [];
  studentEmails: string[] = [];
  selectedStudent: string = '';

  constructor(private adminService: AdminCoursesService) {}

  ngOnInit(): void {
    this.adminService.getAllStudentCourses().subscribe((data) => {
      this.allStudentCourses = data;
      this.filteredCourses = data;
      this.studentEmails = [...new Set(data.map(d => d.studentEmail))];
    });
  }

  filterByStudent(email: string) {
    this.filteredCourses = email === ''
      ? this.allStudentCourses
      : this.allStudentCourses.filter(d => d.studentEmail === email);
  }

  approveCourse(course: any) {
    course.approved = true; // Önce localde işaretle
    this.adminService.approveCourse(course).subscribe(() => {
      // Sunucuya başarıyla gönderildiğinde geri bildirim verilebilir
      console.log('Ders onaylandı:', course);
    });
  }
}
