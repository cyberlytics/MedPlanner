import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FilterSpecializationsComponent } from './filter-specializations.component';

describe('FilterSpecializationsComponent', () => {
  let component: FilterSpecializationsComponent;
  let fixture: ComponentFixture<FilterSpecializationsComponent>;

  const filterAppointmentService = jasmine.createSpyObj('FilterAppointmentsService', {
    isSpecializationSelected: () => {
      return false;
    }
  });
  const specializationsState = jasmine.createSpyObj('SpecializationStateService', {
    getState: () => {
      return [];
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSpecializationsComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
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
