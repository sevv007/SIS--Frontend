import { Component,OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-student-profile',
  imports: [],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit{
  user: User | null = null;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }
}