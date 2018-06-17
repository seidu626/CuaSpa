import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from '@app/shared/utils';

@Component({
  selector: 'app-notfound',
  templateUrl: './page-notfound.component.html',
})
export class PageNotFoundComponent  implements OnInit {
  @Input() appName;
  @Input() companySettings;
  @Input() socialSettings;
  @Input() contactDataSettings;
  year = new Date().getFullYear();
  private util: Utils;

  constructor() {
    this.util = new Utils();
  }

  ngOnInit() {
    this.util.removejscssfile('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css', 'css');
    this.util.removejscssfile('./assets/css/style-admin.css', 'css');
    this.util.loadStyle('./assets/css/bootstrap-3.1.1.css');
    this.util.loadStyle('./assets/css/style.css');
  }

}
