import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../../models/lesson.model';

@Component({
  selector: 'app-transcript',
  imports: [CommonModule, FormsModule],
  templateUrl: './transcript.component.html',
  styleUrl: './transcript.component.css'
})
export class TranscriptComponent implements OnInit {
  completedCourses: Course[] = [];
  totalGano: number = 0;

  ngOnInit(): void {
    const stored = localStorage.getItem('selectedCourses');
    if (stored) {
      const allCourses: Course[] = JSON.parse(stored);
      this.completedCourses = allCourses.filter(c => c.approved && c.note);

      this.calculateGano();
    }
  }

  calculateGano() {
    let totalPoints = 0;
    let totalCredits = 0;

    const gradeMap: { [key: string]: number } = {
      'A': 4.0,
      'B': 3.0,
      'C': 2.0,
      'D': 1.0,
      'F': 0.0
    };

    this.completedCourses.forEach(course => {
      const gradePoint = gradeMap[course.note ?? 'F'];
      const credit = course.credit ?? 3; // default kredi: 3
      totalPoints += gradePoint * credit;
      totalCredits += credit;
    });

    this.totalGano = totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;
  }
}