import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDoctorsComponent } from './filter-doctors.component';

describe('FilterDoctorsComponent', () => {
  let component: FilterDoctorsComponent;
  let fixture: ComponentFixture<FilterDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
