import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';

import { PriorityComponent } from './priority.component';

describe('PriorityComponent', () => {
  let component: PriorityComponent;
  let fixture: ComponentFixture<PriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has icon for priority HIGH', () => {
    component.priority = Priority.HIGH;
    fixture.detectChanges();

    expect(component.priorityIcon).toEqual(MaterialModule.ICON_PRI_HIGH);
  });

  it('should has icon for priority MEDIUM', () => {
    component.priority = Priority.MEDIUM;
    fixture.detectChanges();

    expect(component.priorityIcon).toEqual(MaterialModule.ICON_PRI_MEDIUM);
  });

  it('should has icon for priority LOW', () => {
    component.priority = Priority.LOW;
    fixture.detectChanges();

    expect(component.priorityIcon).toEqual(MaterialModule.ICON_PRI_LOW);
  });

  it('should has icon MEDIUM by default', () => {
    fixture.detectChanges();

    expect(component.priorityIcon).toEqual(MaterialModule.ICON_PRI_MEDIUM);
  });

  it('should has text for priority HIGH', () => {
    component.priority = Priority.HIGH;
    fixture.detectChanges();

    expect(component.priorityText).toEqual('Hoch');
  });

  it('should has text for priority MEDIUM', () => {
    component.priority = Priority.MEDIUM;
    fixture.detectChanges();

    expect(component.priorityText).toEqual('Mittel');
  });

  it('should has text for priority LOW', () => {
    component.priority = Priority.LOW;
    fixture.detectChanges();

    expect(component.priorityText).toEqual('Niedrig');
  });

  it('should has text MEDIUM by default', () => {
    fixture.detectChanges();

    expect(component.priorityText).toEqual('Mittel');
  });
});
