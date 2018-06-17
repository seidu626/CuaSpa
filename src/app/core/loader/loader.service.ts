import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from './loader';
import { NgProgress } from 'ngx-progressbar';

@Injectable()

export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();

    loaderState = this.loaderSubject.asObservable();

  //https://www.npmjs.com/package/ngx-progressbar#ngprogressservice-options-functions
    constructor(public ngProgress: NgProgress) {
    }

    show() {
      /** request started */
      this.ngProgress.start();
       // this.loaderSubject.next(<LoaderState>{show: true});
    }

    //NgProgress.set(n) Sets a percentage n (where n is between 0- 1)

    //NgProgress.inc(n) Increments by n (where n is between 0- 1)

    hide() {
      /** request completed */
      this.ngProgress.done();
        //this.loaderSubject.next(<LoaderState>{show: false});
    }
}
