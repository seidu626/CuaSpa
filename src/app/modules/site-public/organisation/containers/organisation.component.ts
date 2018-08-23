
import {map} from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { ActivatedRoute, Router, Params, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { APP_SETTINGS } from '@app/settings/app-settings';
import { Profile } from '@app/modules/site-admin/employees/models/profile';
import { ProfileService } from '@app/modules/site-admin/employees/services/profile.service';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
})
export class OrganisationComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  showProfileList = false;
  showProfile = false;
  viewMode: string;
  params: any;
  appName = env.appName;
  profile: Observable<Profile>;
  profiles: Observable<Profile[]>;
  profilesTitle: string;
  totalRecords: number;
  profileIds: number[];
  prev: number;
  next: number;
  memberTypeTitleMap = [
    {type: 'directors', title: 'Board of Directors'},
    {type: 'management', title: 'Management'},
    {type: 'loanscommittee', title: 'Loans & Investment Committee'},
    {type: 'auditcommittee', title: 'Audit & Supervisory Committee'},
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params['mode'];
      const view = this.params;
      this.getProfiles(view);
    });
  }

  constructor(private router: Router, private route: ActivatedRoute,
    vcr: ViewContainerRef, private service: SettingsService, private profileService: ProfileService) {
    // https://angular.io/api/router/UrlSegment
    const tree: UrlTree = router.parseUrl(router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log(s);
    this.viewMode = s[0].path;
    this.prev = 0;
    this.next = 0;
    this.profileService.dataObserver.subscribe((records) => {
      this.totalRecords = records.length + 1;
      this.profileIds = records.map((profile) => profile.id);
    });
  }


  onDetail(event) {
    this.profile = this.profileService.get(event.id);
    this.showProfileList = false;
    this.showProfile = true;
  }

  onNextEvent(direction: string) {
    let step = 0;
    if (direction === 'next') {
      this.next = this.next + 1;
      step = this.next;
    }

    if (direction === 'prev') {
      this.prev = this.prev - 1;
      step = this.prev;
    }
    const id = this.profileIds[step];
    this.profile = this.profileService.get(id);
    this.showProfileList = false;
    this.showProfile = true;
  }

  close(event) {
    this.getProfiles(event.memberType);
  }

  getProfiles(memberType: string) {
    this.showProfile = false;
    this.showProfileList = true;
    console.log(this.memberTypeTitleMap);
    this.profilesTitle = this.memberTypeTitleMap.filter(m => m.type === memberType)[0].title;
    if (memberType) {
      this.profiles = this.profileService.getAll(200, 235).pipe(
        map((stream) => stream.filter(p => p.memberType.toLowerCase() === memberType.toLowerCase())));
        this.profiles.subscribe((subs) => console.log(subs));
        return;
    }
    this.profiles = this.profileService.getAll(200, 235);
    return;
  }

}
