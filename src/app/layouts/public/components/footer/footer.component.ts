import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  @Input() appName;
  @Input() companySettings;
  @Input() socialSettings;
  @Input() contactSettings;

  year = new Date().getFullYear();
  appDate = new Date();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
