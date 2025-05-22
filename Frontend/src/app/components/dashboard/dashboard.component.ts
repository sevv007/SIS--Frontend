// components/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userRole: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if (!this.userRole) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
  }

  goToCourses() {
    this.router.navigate(['/student-dashboard/courses']);
  }
  goTotranscript() {
    this.router.navigate(['/student-dashboard/transcript']);
  }
  goToschedule() {
    this.router.navigate(['/student-dashboard/schedule']);
  }
  goToprofile() {
    this.router.navigate(['/student-dashboard/profile']);
  }
  goToannouncements() {
    this.router.navigate(['/student-dashboard/stdannouncements']);
  }

  goToTecprofile() {
    this.router.navigate(['/teacher-dashboard/profile']);
  }
  goToTecclasses() {
    this.router.navigate(['/teacher-dashboard/classes']);
  }
  goToTecannouncements() {
    this.router.navigate(['/teacher-dashboard/announcements']);
  }

  goToadminProfile() {
    this.router.navigate(['/admin-dashboard/profile']);
  }
  goToadminstudents() {
    this.router.navigate(['/admin-dashboard/students']);
  }
  goToadminteachers() {
    this.router.navigate(['/admin-dashboard/teachers']);
  }
  goToadminannouncements() {
    this.router.navigate(['/admin-dashboard/admannouncements']);
  }
  goToadminclassSchedule() {
    this.router.navigate(['/admin-dashboard/classschedule']);
  }
  goToadminregistration() {
    this.router.navigate(['/admin-dashboard/registration']);
  }

}
