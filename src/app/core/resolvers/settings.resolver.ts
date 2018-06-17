import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { ContactDataSettings } from '@app/modules/site-admin/settings/models/contact-data-settings';
import { CompanyInformationSettings } from '@app/modules/site-admin/settings/models/company-information-settings';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';

@Injectable()
export class SettingsResolver implements Resolve<any> {

  constructor(private settingService: SettingsService) {
   }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    const generalSettings = new GeneralSettings;
    const socialSettingsModel = sessionStorage.getItem('_setting_social_');
    const contactSettingsModel = sessionStorage.getItem('_setting_contact_');
    const companySettingsModel = sessionStorage.getItem('_setting_company_');

    if (!companySettingsModel) {
      this.settingService.getGeneralSettings().subscribe(
        (data) => {
          sessionStorage.setItem('_setting_social_', JSON.stringify(data.socialSettings));
          sessionStorage.setItem('_setting_contact_', JSON.stringify(data.contactDataSettings));
          sessionStorage.setItem('_setting_company_', JSON.stringify(data.companyInformationSettings));

          generalSettings.socialSettings = data.socialSettings;

          generalSettings.contactDataSettings = data.contactDataSettings; // new ContactDataSettings(JSON.parse(contactSettingsModel));

          generalSettings.companyInformationSettings = data.companyInformationSettings;

          return generalSettings;
        }
      );
    }

    if (socialSettingsModel) {
      generalSettings.socialSettings = new SocialSettings(JSON.parse(socialSettingsModel));
    }

    if (contactSettingsModel) {
      generalSettings.contactDataSettings = new ContactDataSettings(JSON.parse(contactSettingsModel));
    }

    if (companySettingsModel) {
      generalSettings.companyInformationSettings = new CompanyInformationSettings(JSON.parse(companySettingsModel));
    }

    return generalSettings;
  }
}
