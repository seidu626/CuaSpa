import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';


@Component({
  selector: 'app-settings-company-info',
  templateUrl: './views/settings-company-info.component.html',
})
export class SettingsCompanyInfoComponent implements OnInit {

  id: number;
  frmGroup: FormGroup;
  @Input() setting: GeneralSettings;
  @Output() settingChange: EventEmitter<GeneralSettings> = new EventEmitter<GeneralSettings>();

  // required for validation

  get companyName() { return this.frmGroup.get('companyName'); }
  get address() { return this.frmGroup.get('address'); }
  get title() { return this.frmGroup.get('title'); }
  get about() { return this.frmGroup.get('about'); }
  get mission() { return this.frmGroup.get('mission'); }
  get vision() { return this.frmGroup.get('vision'); }
  get street() { return this.frmGroup.get('street'); }
  get zipCode() { return this.frmGroup.get('zipCode'); }
  get city() { return this.frmGroup.get('city'); }
  get region() { return this.frmGroup.get('region'); }
  get countryName() { return this.frmGroup.get('countryName'); }
  get stateName() { return this.frmGroup.get('stateName'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private toastr: ToastrService, private service: SettingsService) {
  }

  ngOnInit() {
    this.initForm();

    this.
      frmGroup.
      valueChanges.
      subscribe(form => {
        sessionStorage.setItem('_setting_company_', JSON.stringify(form));      
      });

  }

  onSubmit() {
    const formModel = this.frmGroup.value;
    this.setting.companyInformationSettings = new CompanyInformationSettings(formModel);
    this.settingChange.emit(this.setting)
    this.toastr.info("Record successfully modified.", "Record Modified");
  }


  //#endregion 

  private initForm() {
    //observe and fetch departments
    let data = this.setting.companyInformationSettings;


    this.frmGroup = this.fb.group({
      companyName: ['', Validators.required],
      address: '',
      salutation: '',
      title: '',
      about: '',
      mission: '',
      vision: '',
      street: '',
      street2: '',
      zipCode: '',
      city: '',
      region: '',
      countryName: '',
      stateName: ''
    });

    this.frmGroup.setValue({
      companyName: data.companyName,
      address: data.address,
      salutation: data.salutation,
      title: data.title,
      about: data.about,
      mission: data.mission,
      vision: data.vision,
      street: data.street,
      street2: data.street2,
      zipCode: data.zipCode,
      city: data.city,
      region: data.region,
      countryName: data.countryName,
      stateName: data.stateName,
    });
  }
}
