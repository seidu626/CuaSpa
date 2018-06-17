import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';

// https://github.com/angular/angular/issues/9047
function siteServiceFactory(settingService: SettingsService ) {
  return () => settingService.getSettings();
}

export { siteServiceFactory };
