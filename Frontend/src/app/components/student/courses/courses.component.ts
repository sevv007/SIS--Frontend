import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../../models/lesson.model';
import { CourseService } from '../../../services/course.service'
import { AuthService , User} from '../../../services/auth.service';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  // Tüm dersler API’dan çekilecek
  allCourses: Course[] = [];
  // Öğrencinin seçtiği dersler
  selectedCourses: Course[] = [];
  classLevels: string[] = ['1', '2', '3', '4']; // örnek sınıf seviyeleri
  selectedClassLevel: string = ''; // filtre için
  filteredCourses: Course[] = [];
  
  constructor(private courseService: CourseService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((courses) => {
      this.allCourses = courses;
      this.selectedCourses = courses.filter(course => course.selected);
      this.filterCoursesByClass();
    });
  }

  filterCoursesByClass() {
    if (this.selectedClassLevel) {
      this.filteredCourses = this.allCourses.filter(course => course.classLevel === this.selectedClassLevel);
    } else {
      this.filteredCourses = this.allCourses;
    }
  }
  // Ders seçimi yapıldığında (öğrenci ekleyecektir)
  selectCourse(course: Course) {
   // Eğer ders zaten seçilmişse işlem yapmadan çık
  if (course.selected) {
    return;
  }

  // Öğrencinin e-posta adresini localStorage'dan al
  const userEmail = this.authService.getCurrentUserEmail();
  if (!userEmail) {
    alert("Kullanıcı girişi yapılmamış.");
    return;
  }

  // Ders objesine öğrencinin e-posta adresini ekle
  course.selected = true;
  course.studentEmail = userEmail;  // E-posta adresini ekliyoruz

  // API'yi güncelle
  this.courseService.updateCourse(course).subscribe(updatedCourse => {
    // Seçilmiş dersler listesine ekle
    this.selectedCourses.unshift(updatedCourse);
    });
  }
}