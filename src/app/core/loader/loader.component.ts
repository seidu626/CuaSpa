import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

import * as $ from 'jquery'; //http://deanmalone.net/post/using-jquery-from-angular2/

@Component({
    selector: 'angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit {

  show = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;

    private subscription: Subscription;

    constructor(
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
      this.animateloop();
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    animateloop() {
      $("#progressinner").css({ marginLeft: "-45%" });
      $("#progressinner").animate({
        marginLeft: "145%"
      }, 2000, function () { return this;});
    }

}
