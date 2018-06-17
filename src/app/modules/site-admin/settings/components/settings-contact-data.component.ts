import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';

@Component({
  selector: 'app-settings-contact-data',
  templateUrl: './views/settings-contact-data.component.html',
})
export class SettingsContactDataComponent implements OnInit {

  id: number;
  frmGroup: FormGroup;
  @Input() setting: GeneralSettings;
  @Output() settingChange: EventEmitter<GeneralSettings> = new EventEmitter<GeneralSettings>();

  // required for validation
  
  get companyTelephoneNumber() { return this.frmGroup.get('companyTelephoneNumber'); }
  get hotlineTelephoneNumber() { return this.frmGroup.get('hotlineTelephoneNumber'); }
  get mobileTelephoneNumber() { return this.frmGroup.get('mobileTelephoneNumber'); }
  get companyFaxNumber() { return this.frmGroup.get('companyFaxNumber'); }
  get companyEmailAddress() { return this.frmGroup.get('companyEmailAddress'); }
  get webmasterEmailAddress() { return this.frmGroup.get('webmasterEmailAddress'); }
  get supportEmailAddress() { return this.frmGroup.get('supportEmailAddress'); }
  get contactEmailAddress() { return this.frmGroup.get('contactEmailAddress'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private toastr: ToastrService, private service: SettingsService) {
  }

  ngOnInit() {
    this.initForm();
    this.
      frmGroup.
      valueChanges.
      subscribe(form => {
        sessionStorage.setItem('_setting_contact_', JSON.stringify(form));
      });
  }

  onSubmit() {
    const formModel = this.frmGroup.value;
    this.setting.contactDataSettings = new ContactDataSettings(formModel);
    this.settingChange.emit(this.setting);
    this.toastr.info("Record successfully modified.", "Record Modified");   
  }


  //#endregion 

  private initForm() {
    //observe and fetch departments
    let data = this.setting.contactDataSettings;

    this.frmGroup = this.fb.group({
      companyTelephoneNumber: ['', Validators.required],
      hotlineTelephoneNumber: '',
      mobileTelephoneNumber: '',
      companyFaxNumber: '',
      companyEmailAddress: '',
      supportEmailAddress: '',
      contactEmailAddress: '',
      webmasterEmailAddress:''
    });

    this.frmGroup.setValue({
      companyTelephoneNumber: data.companyTelephoneNumber,
      hotlineTelephoneNumber: data.hotlineTelephoneNumber,
      mobileTelephoneNumber: data.mobileTelephoneNumber,
      companyFaxNumber: data.companyFaxNumber,
      companyEmailAddress: data.companyEmailAddress,
      supportEmailAddress: data.supportEmailAddress,
      contactEmailAddress: data.contactEmailAddress,
      webmasterEmailAddress: data.webmasterEmailAddress
    });
  }
}
