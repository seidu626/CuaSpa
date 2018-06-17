import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { Profile } from '@app/modules/site-admin/employees/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: '../views/member-profile.component.html',
})
export class MemberProfileComponent implements OnInit {

  @Input() userProfile: Observable<Profile>;
  @Input() prev: number;
  @Input() next: number;
  @Input() totalRecords: number;
  @Output() nextEvent = new EventEmitter();
  showPrev: boolean;
  showNext: boolean;
  // profile: Profile;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private service: SettingsService) {

  }

  ngOnInit() {
    if (this.prev > 0) {
      this.showPrev = true;
    }
    if (this.next <= this.totalRecords) {
      this.showNext = true;
    }

  }

}
