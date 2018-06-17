import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';

@Component({
  selector: 'app-settings-social',
  templateUrl: './views/settings-social.component.html',
})
export class SettingsSocialComponent implements OnInit {

  id: number;
  frmGroup: FormGroup;
  @Input() setting: GeneralSettings;
  @Output() settingChange: EventEmitter<GeneralSettings> = new EventEmitter<GeneralSettings>();

  // required for validation

  get showSocialLinksInFooter() { return this.frmGroup.get('showSocialLinksInFooter'); }
  get facebookLink() { return this.frmGroup.get('facebookLink'); }
  get googlePlusLink() { return this.frmGroup.get('googlePlusLink'); }
  get twitterLink() { return this.frmGroup.get('twitterLink'); }
  get pinterestLink() { return this.frmGroup.get('pinterestLink'); }
  get linkedInLink() { return this.frmGroup.get('linkedInLink'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private toastr: ToastrService, private service: SettingsService) {
  }

  ngOnInit() {
    this.initForm();

    this.
      frmGroup.
      valueChanges.
      subscribe(form => {
        sessionStorage.setItem('_setting_social_', JSON.stringify(form));
      });
  }

  onSubmit() {
    const formModel = this.frmGroup.value;
    this.setting.socialSettings = new SocialSettings(formModel);
    this.settingChange.emit(this.setting);
    this.toastr.info("Record successfully modified.", "Record Modified");
  }


  //#endregion 

  private initForm() {
    //observe and fetch departments
    let data = this.setting.socialSettings;

    this.frmGroup = this.fb.group({
      showSocialLinksInFooter: ['', Validators.required],
      facebookLink: '',
      googlePlusLink: '',
      twitterLink: '',
      pinterestLink: '',
      linkedInLink: ''
    });

    this.frmGroup.setValue({
      showSocialLinksInFooter: data.showSocialLinksInFooter,
      facebookLink: data.facebookLink,
      googlePlusLink: data.googlePlusLink,
      twitterLink: data.twitterLink,
      linkedInLink: data.linkedInLink,
      pinterestLink: data.pinterestLink
    });
  }
}
