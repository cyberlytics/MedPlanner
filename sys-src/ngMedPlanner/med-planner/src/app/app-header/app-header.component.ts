import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MaterialModule } from '../material/material.module';
import { AppHeaderStateService, DrawerAction } from '../services/state-services/app-header-state.service';
import { AppStateService, Dashbord } from '../services/state-services/app-state.service';
import { UserStateService } from '../services/user-services/user-state.service';

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

  get isLoggedIn(): boolean {
    return this.userState.isLoggedIn;
  }

  get getIcon(): string {
    return this.appState.selectedDashboard === Dashbord.APPOINTMENTS ?
      MaterialModule.ICON_APPOINTMENTS_MENU : MaterialModule.ICON_DOCTORS_MENU;
  }

  constructor(
    private appState: AppStateService,
    private headerState: AppHeaderStateService,
    private userState: UserStateService,
  ) {
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

  public onFilterClick(): void {
    this.headerState.clickOnFilter(DrawerAction.OPEN);
  }

  public logout(): void {
    this.userState.logout();
  }

  public switchAppointmentDoctors(): void {
    this.appState.switchDashboards();
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
