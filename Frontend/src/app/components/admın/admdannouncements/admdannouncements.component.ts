import { Component } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admdannouncements',
  imports: [CommonModule, FormsModule],
  templateUrl: './admdannouncements.component.html',
  styleUrl: './admdannouncements.component.css'
})
export class AdmdannouncementsComponent {

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
