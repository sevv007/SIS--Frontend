import { Component } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent {

  newAnnouncement: string = '';

  constructor(private announcementService: AnnouncementService) {}

  addAnnouncement() {
    if (this.newAnnouncement.trim()) {
      this.announcementService.addAnnouncement(this.newAnnouncement);
      this.newAnnouncement = '';
    }
  }

  get announcements() {
    return this.announcementService.getAnnouncements();
  }
}
