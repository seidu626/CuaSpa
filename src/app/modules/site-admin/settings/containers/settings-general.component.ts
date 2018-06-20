import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';
import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';

@Component({
  selector: 'app-settings-general',
  templateUrl: './settings-general.component.html',
})

export class SettingsGeneralComponent implements OnInit {

  public setting: GeneralSettings;

  ngOnInit(): void {
    this.loadSettings();
  }

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private service: SettingsService) {
  }

  onSubmit() {
    //https://kfarst.github.io/angular/2016/12/12/subscribing-to-form-value-changes-in-angular-2/

    let socialSettings = sessionStorage.getItem('_setting_social_');
    let contactSettings = sessionStorage.getItem('_setting_contact_');
    let companySettings = sessionStorage.getItem('_setting_company_');
    if (socialSettings) {
      this.setting.socialSettings = new SocialSettings(JSON.parse(socialSettings));
    }

    if (contactSettings) {
      this.setting.contactDataSettings = new ContactDataSettings(JSON.parse(contactSettings));
    }

    if (companySettings) {
      this.setting.companyInformationSettings = new CompanyInformationSettings(JSON.parse(companySettings));
    }
    console.log(this.setting);
    this.service.postGeneralSettings(this.setting).subscribe(
      (result) => {
        console.log(result);
        this.toastr.info("Record successfully modified.", "Record Modified");
      }
    );
  }

  loadSettings() {
    this.service.getGeneralSettings().subscribe(
      (results) => {
        this.setting = results;
      }
    );

  }

}
