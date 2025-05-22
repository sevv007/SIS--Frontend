// components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService , User} from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(user => {
      if (user) {
        const role = user.role;

        switch (role) {
          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;
          case 'teacher':
            this.router.navigate(['/teacher/dashboard']);
            break;
          case 'student':
            this.router.navigate(['/student/dashboard']);
            break;
          default:
            this.errorMessage = 'Tanımsız kullanıcı rolü!';
        }
      } else {
        this.errorMessage = 'Geçersiz e-posta veya şifre.';
      }
    });
  }
}

