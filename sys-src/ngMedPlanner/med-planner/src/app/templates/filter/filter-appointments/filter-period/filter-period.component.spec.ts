import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FilterPeriodComponent } from './filter-period.component';

describe('FilterPeriodComponent', () => {
  let component: FilterPeriodComponent;
  let fixture: ComponentFixture<FilterPeriodComponent>;

  const filterAppointmentService = jasmine.createSpyObj('FilterAppointmentsService', {
    selectStartDate: () => {
      return false;
    },
    selectEndDate: () => {
      return false;
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPeriodComponent ],
      imports: [
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
