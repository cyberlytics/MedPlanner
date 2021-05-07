import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header-component',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('toolbarElement') toolbarElement: MatToolbar | undefined;
  @ViewChild('headerElement') headerElement: ElementRef;

  constructor() {
    this.headerElement = new ElementRef(null);
  }

  ngAfterViewInit(): void {
    const toolbarHeight = this.toolbarElement?._elementRef.nativeElement.offsetHeight;

    try {
      this.headerElement.nativeElement.style.top = `${toolbarHeight}px`;
    } catch (e) {
      console.error(e);
    }
  }

  ngOnInit(): void {}

}
