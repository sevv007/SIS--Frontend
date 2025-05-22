import { Component ,OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-teacher-profile',
  imports: [],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent implements OnInit{
  user: User | null = null;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }
}
