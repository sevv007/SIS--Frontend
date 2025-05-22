import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:5000/api/courses'; // Kendi API URL'in

  constructor(private http: HttpClient) {}

  // Tüm dersleri getir
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // Bir dersi güncelle (örneğin, öğrenci seçimi, not, gün, saat vs.)
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  // Yeni ders ekle (öğrenci tarafından seçilen ders için)
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }
  searchCourses(searchTerm: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}?studentEmail_like=${searchTerm}`);
  }
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}