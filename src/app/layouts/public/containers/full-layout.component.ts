import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, HostBinding, Output, EventEmitter, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '@app/modules/auth/store/reducers';
import { environment as env } from '@env/environment';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, ActivationEnd, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { filter } from 'rxjs/operators/filter';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';
import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { APP_SETTINGS } from '@app/settings/app-settings';
import { Logout } from '@app/modules/auth/store/actions/auth.actions';
import { Utils } from '@app/shared/utils';
import * as Auth from '@app/modules/auth/store/actions/auth.actions';

@Component({
  selector: 'app-container',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullLayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  public isLoggedIn$: Observable<boolean>;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public socialSettings = new SocialSettings;
  public contactSettings = new ContactDataSettings;
  public companySettings = new CompanyInformationSettings;
  public generalSettings: GeneralSettings;
  private util: Utils;
  private state: RouterStateSnapshot;

  @HostBinding('class') componentCssClass;

  appName = env.appName;
  isProd = env.production;
  year = new Date().getFullYear();
  logo = ''; // require('../../../../assets/img/logo.png');
  navigation = [
    { link: '', label: 'Home' },
    // { link: 'about', label: 'About' }
  ];
  navigationSideMenu = [
    ...this.navigation,
  ];



  constructor(
    private route: ActivatedRoute,
    private store: Store<fromAuth.State>,
    public overlayContainer: OverlayContainer,
    //    private store: Store<any>,
    private router: Router,
    private titleService: Title

  ) {
    this.util = new Utils();
    this.state = router.routerState.snapshot;
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof ActivationEnd)
      )
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      });
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);

  }

  login() {
    this.store.dispatch(
      new Auth.LoginRedirect({
        queryParams: { returnUrl: this.state.url }
      }
      )
    );
  }

  logout() { this.store.dispatch(new Logout()); }

  // https://www.sitepoint.com/community/t/angular2-how-to-load-external-javascript-file-dynamically/259478/8
  ngAfterViewInit(): void {
    this.util.removejscssfile('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css', 'css');
    this.util.removejscssfile('./assets/css/style-admin.css', 'css');
    this.util.loadStyle('./assets/css/bootstrap-3.1.1.css');
    this.util.loadStyle('./assets/css/style.css');
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    const generalSettings = APP_SETTINGS.generalSettings;
    this.socialSettings = generalSettings.socialSettings;
    this.contactSettings = generalSettings.contactDataSettings;
    this.companySettings = generalSettings.companyInformationSettings;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
