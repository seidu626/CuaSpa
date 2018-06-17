import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '@app/domain/services/contact.service';
import { Observable } from 'rxjs/Observable';
import { APP_SETTINGS } from '@app/settings/app-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';
import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactUsComponent implements OnInit {

  id: number;
  editMode = false;
  frmContact: FormGroup;
  socialSettings = new SocialSettings;
  contactDataSettings = new ContactDataSettings;
  companySettings = new CompanyInformationSettings;
  generalSettings: GeneralSettings;


  // required for validation
  get firstname() { return this.frmContact.get('firstname'); }
  get lastname() { return this.frmContact.get('lastname'); }
  get email() { return this.frmContact.get('email'); }
  get phone() { return this.frmContact.get('phone'); }
  get message() { return this.frmContact.get('message'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private service: ContactService) {

  }

  ngOnInit() {
    this.init();
    this.initForm();
  }

  onSubmit() {
    let vbOperation: Observable<Response>;

    const formModel = this.frmContact.value;

    formModel['id'] = 0;
    vbOperation = this.service.post(formModel);

    // Subscribe to observable
    vbOperation.subscribe(
      results => {
       // this.toastr.success("Record successfully added.", "Message sent");
      },
      err => {
        // Log errors if any
        console.log(err);
      });

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/public/home'], { relativeTo: this.route });
  }

  private initForm() {
    this.frmContact = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  init(): void {

    const generalSettings = APP_SETTINGS.generalSettings;
    console.log(generalSettings);

    this.socialSettings = generalSettings.socialSettings;

    this.contactDataSettings = generalSettings.contactDataSettings;

    this.companySettings = generalSettings.companyInformationSettings;
  }

}
