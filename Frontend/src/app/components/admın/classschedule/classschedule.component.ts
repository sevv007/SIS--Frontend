import { Component,  OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService} from '../../../services/course.service'
import { Course } from '../../../models/lesson.model';
import { AuthService} from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classschedule',
  imports: [FormsModule,CommonModule],
  templateUrl: './classschedule.component.html',
  styleUrl: './classschedule.component.css'
})
export class ClassscheduleComponent implements OnInit{

 searchTerm: string = ''; // Arama inputu
  courses: Course[] = []; // Arama sonuçlarını tutacak liste

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Admin giriş yaptıktan sonra tüm dersler gösterilsin
    this.getAllCourses();
  }

  // Tüm dersleri getir
  getAllCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data.filter(course => course.approved); // Onaylanmış dersler
    });
  }

  // Öğrenci adı veya e-mail ile dersleri ara
  searchCourses(): void {
    if (!this.searchTerm) {
      this.getAllCourses(); // Arama yapılmazsa tüm dersleri getir
    } else {
      this.courseService.searchCourses(this.searchTerm).subscribe(data => {
        this.courses = data.filter(course => course.approved); // Onaylanmış dersleri filtrele
      });
    }
  }
}
