import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';
import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';
import { Slider } from '@app/modules/site-public/home/models/slider';

export let APP_SETTINGS = {
  connectionString: '',
  defaultImageUrl: '',
  generalSettings: new GeneralSettings,
  contentsliders: new Array<Slider>()
};
