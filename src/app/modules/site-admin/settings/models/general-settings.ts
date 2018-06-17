import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';

export class GeneralSettings {

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  companyInformationSettings: CompanyInformationSettings;
  contactDataSettings: ContactDataSettings;
  socialSettings: SocialSettings;
}
