import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Utils } from '@app/shared/utils';
import { navItems } from './_nav';
import { Router, NavigationEnd, RouterStateSnapshot } from '@angular/router';
import { User } from '@app/modules/auth/models/user';
import { Store } from '@ngrx/store';
import * as fromAuth from '@app/modules/auth/store/reducers';
import * as Auth from '@app/modules/auth/store/actions/auth.actions';
import { Logout } from '@app/modules/auth/store/actions/auth.actions';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout-admin.component.html'
})
export class FullLayoutAdminComponent implements OnInit, AfterViewInit {
  private util: Utils;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public user: User;
  isLoggedIn$: Observable<boolean>;
  private state: RouterStateSnapshot;

  appName = env.appName;
  date = new Date().getFullYear();


  constructor(private router: Router, public store: Store<fromAuth.State>) {
    this.util = new Utils();
    this.user = new User();
    this.state = router.routerState.snapshot;
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);
  }

  login() {
    this.store.dispatch(
      new Auth.LoginRedirect({
        queryParams: { returnUrl: this.state.url }
      })
    );
  }

  logout() { this.store.dispatch(new Logout()); }

  ngOnInit(): void {
     this.util.removejscssfile('bootstrap-3.1.1.css', 'css');
     this.util.removejscssfile('style.css', 'css');
    // this.util.loadStyle('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css');
      this.util.loadStyle('./assets/css/style-admin.css');
     this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit(): void {
  }
}
