import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';
import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() isLoggedIn: false;
  @Output() loginClick = new EventEmitter<boolean>();
  @Output() logoutClick = new EventEmitter<boolean>();
  @Input() appName;
  @Input() companySettings: CompanyInformationSettings;
  @Input() socialSettings: SocialSettings;
  @Input() contactSettings: ContactDataSettings;
  year = new Date().getFullYear();
  appDate = new Date();
 // tslint:disable-next-line:max-line-length
 // https://stackoverflow.com/questions/48058827/how-can-i-use-bootstrap-navbar-in-ngx-bootstrap-for-angular-5?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
 isCollapsed = true;
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  login() { this.loginClick.emit(); }
  logout() { this.logoutClick.emit(); }

}
