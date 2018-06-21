
import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private http: Http,  private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
     /** spinner starts on init */
     this.spinner.show();

     setTimeout(() => {
      // this.initialize();
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 3000);
  }

}
