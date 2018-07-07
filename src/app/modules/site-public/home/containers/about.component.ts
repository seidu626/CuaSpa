import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { APP_SETTINGS } from '@app/settings/app-settings';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  history = false;
  mission = false;

  historyInfo = "";
  missionInfo = "";
  visionInfo = "";

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(
      (params) => {
        let view = params['mode'];
        if (view == "history") {
          this.history = true;
          this.mission = false;
        }
        else if (view == "mission") {
          this.mission = true;
          this.history = false;
        }
        else {
          this.history = true;
          this.mission = false;
        }
      });
    this.initialize();
  }
  
  constructor(private router: Router, private route: ActivatedRoute,
    vcr: ViewContainerRef, private service: SettingsService) {
  }

  initialize() {
    if (APP_SETTINGS.generalSettings) {
      this.historyInfo = APP_SETTINGS.generalSettings.companyInformationSettings.about;
      this.missionInfo = APP_SETTINGS.generalSettings.companyInformationSettings.mission;
      this.visionInfo = APP_SETTINGS.generalSettings.companyInformationSettings.vision;
    } else {
      this.service.getGeneralSettings().subscribe(
        (data) => {
          this.historyInfo = data.companyInformationSettings.about;
          this.missionInfo = data.companyInformationSettings.mission;
          this.visionInfo = data.companyInformationSettings.vision;
        }
      )
    }
  }

  
}
