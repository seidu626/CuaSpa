import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { Profile } from '@app/modules/site-admin/employees/models/profile';
import { Utils } from '@app/shared/utils';


@Component({
  selector: 'app-profiles',
  templateUrl: '../views/member-profiles.component.html',
  styleUrls: ['../styles/member-profiles.component.scss'],
})
export class MemberProfilesComponent implements OnInit {

  @Input() profiles: Observable<Profile[]>;
  @Input() appName: string;
  @Input() profilesTitle: string;
  @Output() viewEvent = new EventEmitter();
  public members: any;


  constructor(private router: Router, private route: ActivatedRoute,
    vcr: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.profiles.subscribe(
      (data) => {
        this.members = null;
        const results = Utils.chunkBy(data, 4);
        console.log(results);
        this.members = results;
      }
    );
  }

  public applyClearfix(count: number): boolean {
    return count % 2 === 0;
  }
}
