import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';

export class GeneralSettings {

  constructor(values: Object = null) {
    if (values) {
      Object.assign(this, values);
    } else {
      this.companyInformationSettings = new CompanyInformationSettings;
      this.contactDataSettings = new ContactDataSettings;
      this.socialSettings = new SocialSettings;
    }
  }

  companyInformationSettings: CompanyInformationSettings;
  contactDataSettings: ContactDataSettings;
  socialSettings: SocialSettings;
}
