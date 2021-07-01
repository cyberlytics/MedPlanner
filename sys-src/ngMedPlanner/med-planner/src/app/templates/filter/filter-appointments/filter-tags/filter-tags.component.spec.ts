import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FilterTagsComponent } from './filter-tags.component';

describe('FilterTagsComponent', () => {
  let component: FilterTagsComponent;
  let fixture: ComponentFixture<FilterTagsComponent>;

  const filterAppointmentService = jasmine.createSpyObj('FilterAppointmentsService', {
    isTagSelected: () => {
      return false;
    }
  });
  const tagsState = jasmine.createSpyObj('TagsStateService', {
    getState: () => {
      return [];
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTagsComponent ],
      imports: [
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
