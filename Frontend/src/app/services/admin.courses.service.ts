import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //API çağrılarında asenkron veri akışını yönetmek için kullanılır.
import { Injectable } from '@angular/core';
import { Course } from '../models/lesson.model';
@Injectable({ providedIn: 'root' })

export class AdminCoursesService {
  private apiUrl = 'http://localhost:5000/api/courses';

  constructor(private http: HttpClient) {}

  getAllStudentCourses(studentEmail?: string, selectedOnly: boolean = true): Observable<any[]> {
    let url = this.apiUrl;
    if (studentEmail || selectedOnly) {
        url += '?';
        const params: string[] = [];
        if (selectedOnly) {
            params.push(`selected=true`);
        }
        if (studentEmail) {
            params.push(`studentEmail=${studentEmail}`);
        }
        url += params.join('&');
    }
    return this.http.get<any[]>(this.apiUrl);
  }

  approveCourse(course: Course): Observable<any> {
    return this.http.put(`${this.apiUrl}/${course.id}`, course);
  }
}