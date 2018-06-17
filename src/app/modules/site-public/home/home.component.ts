import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { environment as env, environment } from '@env/environment';
import { Slider } from '@app/modules/site-public/home/models/slider';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { MediaItemService } from '@app/modules/site-admin/media/services/media-item.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { APP_SETTINGS } from '@app/settings/app-settings';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-home',
  templateUrl: './views/home.component.html',
  styleUrls: ['./styles/home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  sliders: Slider[];

  constructor(
    private route: ActivatedRoute,
    config: NgbCarouselConfig,
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    private titleService: Title,
    private settingService: SettingsService,
    private mediaItemSvc: MediaItemService,
    private spinner: NgxSpinnerService
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
  }

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      this.initialize();
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }

  ngOnDestroy(): void {

  }

  initialize() {
    // this.sliders = this.route.snapshot.data['contentSliders'];
    // let sliders = APP_SETTINGS.contentsliders;
    this.mediaItemSvc.getSliders(400, 1244)
      .subscribe((results) => {
        const first = results[0];
        first.active = 'active';
        results[0] = first;
        this.sliders = results;
        console.log(this.sliders);
      });

  }
}
