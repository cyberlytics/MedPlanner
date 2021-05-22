import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDetailViewComponent } from './popup-detail-view.component';

describe('PopupDetailViewComponent', () => {
  let component: PopupDetailViewComponent;
  let fixture: ComponentFixture<PopupDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
