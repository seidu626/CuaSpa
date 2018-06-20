import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { Profile } from '@app/modules/site-admin/employees/models/profile';


@Component({
  selector: 'app-profiles',
  templateUrl: '../views/member-profiles.component.html',
  styleUrls: ['../styles/member-profiles.component.scss'],
})
export class MemberProfilesComponent implements OnInit {

  @Input() profiles: Observable<Profile[]>;
  @Input() appName: string;
  @Output() viewEvent = new EventEmitter();

  ngOnInit(): void {
  }
  constructor(private router: Router, private route: ActivatedRoute,
    vcr: ViewContainerRef, private settingsService: SettingsService) {
  }

  public applyClearfix(count: number): boolean {
    return count % 2 === 0;
  }
}
