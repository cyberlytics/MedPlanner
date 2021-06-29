import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TagModel } from 'src/app/services/state-services/tags/tag-model';

import { TagsComponent } from './tags.component';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  const tags: TagModel[] = [
    new TagModel({ id: 0, description: 'Descr1', color: 'rgb(0, 0, 0)'}),
    new TagModel({ id: 0, description: 'Descr2', color: 'rgb(0, 0, 100)'}),
    new TagModel({ id: 0, description: 'Descr3', color: 'rgb(0, 100, 0)'}),
    new TagModel({ id: 0, description: 'Descr4', color: 'rgb(100, 0, 0)'})
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ TagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    spyOnProperty(component, 'tags').and.returnValue(tags);

    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('.tag'));
    expect(elements.length).toEqual(tags.length);
  });

  it('should contain description', () => {
    const min = 0;
    const max = tags.length - 1;
    const randomIndex = Math.floor(Math.random() * (max - min + 1 ) + min);

    spyOnProperty(component, 'tags').and.returnValue(tags);
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('.tag'));
    expect(elements[randomIndex].nativeElement.innerText).toContain(tags[randomIndex].description);
  });

  it('should have a color', () => {
    const min = 0;
    const max = tags.length - 1;
    const randomIndex = Math.floor(Math.random() * (max - min + 1 ) + min);

    spyOnProperty(component, 'tags').and.returnValue(tags);
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('.tag'));
    expect(getComputedStyle(elements[randomIndex].nativeElement).color)
      .toEqual(tags[randomIndex].color);
  });
});
