import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '@app/modules/auth/store/reducers';
import { AuthEffects } from '@app/modules/auth/store/effects/auth.effect';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from '@app/modules/auth/services/auth-guard.service';
import { AuthService } from '@app/modules/auth/services/auth.service';

@NgModule({
    imports: [
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [AuthGuard, AuthService],
    exports: [StoreModule]
})
export class AppAuthStoreModule { }
