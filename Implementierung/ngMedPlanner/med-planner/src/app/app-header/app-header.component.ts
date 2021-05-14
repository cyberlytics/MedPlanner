import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { AppHeaderStateService } from '../services/state-services/app-header-state.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('toolbarElement') toolbarElement: MatToolbar | undefined;
  @ViewChild('headerElement') headerElement: ElementRef;

  @Output('onHeaderHeightInit')
  get headerHeightInit(): EventEmitter<number> {
    return this._headerHeightInit;
  }
  private _headerHeightInit: EventEmitter<number>;

  get headerTitle(): string {
    return this.headerState.headerTitle;
  }

  get headerSubTitle(): string {
    return this.headerState.headerSubTitle;
  }

  constructor(private headerState: AppHeaderStateService) {
    this.headerElement = new ElementRef(null);
    this._headerHeightInit = new EventEmitter<number>();
  }

  ngAfterViewInit(): void {
    this.initTopOffsets();
  }

  ngOnInit(): void {}

  public onWindowResize(): void {
    this.initTopOffsets();
  }

  private initTopOffsets(): void {
    try {
      const toolbarHeight = this.toolbarElement?._elementRef.nativeElement.offsetHeight;
      this.headerElement.nativeElement.style.top = `${toolbarHeight}px`;

      this._headerHeightInit.emit(this.headerElement.nativeElement.offsetHeight + toolbarHeight);
    } catch (e) {
      console.error(e);
    }
  }

}
