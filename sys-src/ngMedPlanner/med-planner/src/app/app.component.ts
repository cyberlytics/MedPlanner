import { AfterViewInit, OnDestroy, Component, ElementRef, ViewChild } from '@angular/core';
import { UserStateService } from './services/user-services/user-state.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AppStateService, Dashbord } from './services/state-services/app-state.service';
import { Subscription } from 'rxjs';
import { AppHeaderStateService, DrawerAction } from './services/state-services/app-header-state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('routerBlockDiv') routerBlockDiv: ElementRef;
  @ViewChild('drawer') drawer: MatSidenav | undefined;

  title = 'med-planner';

  private _onDashboardSwitcher: Subscription | undefined;
  private _onFilterClick: Subscription | undefined;
  private _onMenuClick: Subscription | undefined;



  constructor(
    private appState: AppStateService,
    private appHeaderState: AppHeaderStateService,
    private userState: UserStateService,
    private router: Router
  ) {
    this.routerBlockDiv = new ElementRef(null);
    this.userState.checkLogin();
  }

  ngAfterViewInit(): void {
    this._onDashboardSwitcher = this.appState.setOnDashboardSwitchListener(
      (dashboard: Dashbord) => { this.onDashboardSwitch(dashboard); }
    );

    this._onFilterClick = this.appHeaderState.setOnFilterClickListener(
      (action: DrawerAction) => {
        this.onDrawerAction(action);
      }
    );

    this._onMenuClick = this.appHeaderState.setOnMenuClickListener(
      (action: DrawerAction) => {
        this.onDrawerAction(action);
      }
    );
  }

  ngOnDestroy(): void {
    this._onDashboardSwitcher?.unsubscribe();
    this._onFilterClick?.unsubscribe();
    this._onMenuClick?.unsubscribe();
  }

  public onHeaderHeightInit(_headerHeight: number): void {
    try {
      this.routerBlockDiv.nativeElement.style.marginTop = _headerHeight + 'px';
    } catch (e) {
      console.error(e);
    }
  }

  private onDashboardSwitch(dashboard: Dashbord): void {
    switch (dashboard) {
      case Dashbord.APPOINTMENTS: {
        this.router.navigate(['appointment-dashboard']);
        return;
      }
      case Dashbord.DOCTORS: {
        this.router.navigate(['doctor-dashboard']);
        return;
      }
    }
  }

  private onDrawerAction(action: DrawerAction): void {
    switch (action) {
      case DrawerAction.OPEN:
        this.drawer?.open();
        break;
      case DrawerAction.CLOSE:
        this.drawer?.close();
        break;
    }
  }
}
