import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Utils } from '@app/shared/utils';


@Component({
  selector: 'app-auth',
  templateUrl: './full-layout-auth.component.html'
})
export class FullLayoutAuthComponent implements OnInit, AfterViewInit {
  private util: Utils;
  public constructor() {
    this.util = new Utils();
  }


  // https://www.sitepoint.com/community/t/angular2-how-to-load-external-javascript-file-dynamically/259478/8
  ngAfterViewInit(): void {
    this.util.removejscssfile('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css', 'css');
    this.util.removejscssfile('./assets/css/style-admin.css', 'css');
     this.util.loadStyle('./assets/css/bootstrap-3.1.1.css');
     this.util.loadStyle('./assets/css/style.css');
  }


  ngOnInit(): void {

  }
}
