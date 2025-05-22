import { Component,OnInit } from '@angular/core';
import { Course } from '../../../models/lesson.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service'
import { AuthService , User} from '../../../services/auth.service';

@Component({
  selector: 'app-students',
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
 selectedCourses: Course[] = [];
  
  constructor(private courseService: CourseService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((courses) => {
      // Seçilmiş ve onay bekleyen dersleri filtrele
      this.selectedCourses = courses.filter(course => course.selected && !course.approved);
    });
  }

  approveCourse(course: Course) {
    course.approved = true;

    // Giriş yapan öğretmenin email adresini al
    const teacherEmail = this.authService.getCurrentUserEmail();
    console.log('Teacher Email:', teacherEmail); // Email doğru alınıyor mu?
  
    if (teacherEmail) {
      course.teacherEmail = teacherEmail;
    }
  
    this.courseService.updateCourse(course).subscribe(updatedCourse => {
      const index = this.selectedCourses.findIndex(c => c.id === updatedCourse.id);
      if (index !== -1) {
        this.selectedCourses[index] = updatedCourse;
      }
    });
  }

  updateNote(course: Course, newNote: string) {
    course.note = newNote;
    this.courseService.updateCourse(course).subscribe(updatedCourse => {
      // Not eklendikten sonra dersin güncel halini listeye ekle
      const index = this.selectedCourses.findIndex(c => c.id === updatedCourse.id);
      if (index !== -1) {
        this.selectedCourses[index] = updatedCourse;
      }
    });
  }
  
  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course.id).subscribe(() => {
      // Ders silindikten sonra listeden çıkar
      this.selectedCourses = this.selectedCourses.filter(c => c.id !== course.id);
    });
  }
}
