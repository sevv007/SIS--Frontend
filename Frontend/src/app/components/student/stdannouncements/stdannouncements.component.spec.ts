import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdannouncementsComponent } from './stdannouncements.component';

describe('StdannouncementsComponent', () => {
  let component: StdannouncementsComponent;
  let fixture: ComponentFixture<StdannouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StdannouncementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdannouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
