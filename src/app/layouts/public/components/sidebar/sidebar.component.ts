import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() isLoggedIn: false;
  @Output() logoutClick = new EventEmitter<boolean>();
  @Input() appName;
  @Input() socialSettings;

  constructor() { }

  ngOnInit() {
  }

  logout() { this.logoutClick.emit(); }

}
