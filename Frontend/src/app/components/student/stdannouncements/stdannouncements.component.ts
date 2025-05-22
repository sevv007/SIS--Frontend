import { Component } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stdannouncements',
  imports: [CommonModule, FormsModule],
  templateUrl: './stdannouncements.component.html',
  styleUrl: './stdannouncements.component.css'
})
export class StdannouncementsComponent {
  constructor(private announcementService: AnnouncementService) {}

  get announcements() {
    return this.announcementService.getAnnouncements();
  }

}
