import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmdannouncementsComponent } from './admdannouncements.component';

describe('AdmdannouncementsComponent', () => {
  let component: AdmdannouncementsComponent;
  let fixture: ComponentFixture<AdmdannouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmdannouncementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmdannouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
