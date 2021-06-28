import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDetailViewComponent } from './doctor-detail-view.component';

describe('DoctorDetailViewComponent', () => {
  let component: DoctorDetailViewComponent;
  let fixture: ComponentFixture<DoctorDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
