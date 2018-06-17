import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';

@Component({
  selector: 'app-mission-vision',
  templateUrl: './views/mission-vision.component.html',
})
export class MissionVisionComponent implements OnInit {
  
  @Input() mission: string;

  @Input() vision: string;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private service: SettingsService) {
  }

  ngOnInit() {
    
  }
  
}
