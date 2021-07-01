import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FilterCitiesComponent } from './filter-cities.component';

describe('FilterCitiesComponent', () => {
  let component: FilterCitiesComponent;
  let fixture: ComponentFixture<FilterCitiesComponent>;

  const filterAppointmentService = jasmine.createSpyObj('FilterAppointmentsService', {
    isCitySelected: () => {
      return false;
    }
  });

  const surgeryState = jasmine.createSpyObj('SurgeryStateService', {
    getStateData: () => {
      return [];
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCitiesComponent ],
      imports: [
        RouterTestingModule
      ]
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
