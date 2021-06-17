import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSpecializationsComponent } from './filter-specializations.component';

describe('FilterSpecializationsComponent', () => {
  let component: FilterSpecializationsComponent;
  let fixture: ComponentFixture<FilterSpecializationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSpecializationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSpecializationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
