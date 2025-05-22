import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  userForm: FormGroup;
  roles: string[] = ['student', 'teacher', 'admin']; // Rol seçenekleri

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      name: [''],
      phone: [''],
      profession: [''],
      teacherfaculty: [''],
      studentfaculty: [''],
      department: [''],
      branch:[''],
      gpa: [''],
      Counselor:[''],
      faculty: [''],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.http.post('http://localhost:5000/api/users/register', this.userForm.value)
        .subscribe(() => {
          alert('Registration successful!');


          // Kayıt başarılı olduktan sonra, e-posta adresini localStorage'a kaydet
        const userEmail = this.userForm.value.email;
        localStorage.setItem('userEmail', userEmail);
        
          this.userForm.reset();
        }, error => {
          alert('An error qccurred during registration.');
          console.error(error);
        });
    } else {
      alert('You must fill in all fields.');
    }
  }

}