import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { settingsReducer } from './settings.reducer';
import { SettingsEffects } from './settings.effects';
import { SettingsComponent } from './settings/settings.component';
import { MaterialModule } from '@app/layouts/material.module';
import { RouterModule, Routes } from '@angular/router';

const configRoutes: Routes = [
  {
    path: 'settings',
    children: [
      { path: '', component: SettingsComponent },
    ]
  }
];

@NgModule({
  imports: [
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([SettingsEffects]),
    MaterialModule,
    RouterModule.forChild(configRoutes)
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
