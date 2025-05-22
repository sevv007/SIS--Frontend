// announcement.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private announcements: string[] = [];

  addAnnouncement(announcement: string) {
    this.announcements.push(announcement);
  }

  getAnnouncements() {
    return this.announcements;
  }
}
/*Duyuruları (announcements) saklamak ve yönetmek için bir hizmet (service) sınıfı oluşturur.
Yeni bir duyuru ekleyebilir ve mevcut duyuruları alabilir.
Veriler bellekte tutulur, yani sayfa yenilendiğinde duyurular kaybolur*/ 