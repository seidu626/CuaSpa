import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '@app/domain/services/contact.service';
import { APP_SETTINGS } from '@app/settings/app-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';
import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';


@Component({
  selector: 'app-organisation-structure',
  templateUrl: './organisation-structure.component.html'
})
export class OrganisationStructureComponent implements OnInit {

  socialSettings = new SocialSettings;
  contactDataSettings = new ContactDataSettings;
  companySettings = new CompanyInformationSettings;
  generalSettings: GeneralSettings;


  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private service: ContactService) {

  }

  ngOnInit() {
    this.init();  
  }

  init(): void {

    const generalSettings = APP_SETTINGS.generalSettings;

    this.socialSettings = generalSettings.socialSettings;

    this.contactDataSettings = generalSettings.contactDataSettings;

    this.companySettings = generalSettings.companyInformationSettings;
  }

}
