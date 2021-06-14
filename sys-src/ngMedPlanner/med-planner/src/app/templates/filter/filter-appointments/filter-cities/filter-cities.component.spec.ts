import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCitiesComponent } from './filter-cities.component';

describe('FilterCitiesComponent', () => {
  let component: FilterCitiesComponent;
  let fixture: ComponentFixture<FilterCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
