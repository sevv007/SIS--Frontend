import { Component ,OnInit} from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-admin-profile',
  imports: [],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit{
  user: User | null = null;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }
}
