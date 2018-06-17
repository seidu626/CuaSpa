import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers/root.reducer';
import { MetaReducer, StoreModule } from '@ngrx/store';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer,
} from '@ngrx/router-store';
import { environment } from '../../../environments/environment';
import { CustomRouterStateSerializer } from '@app/shared/utils';

@NgModule({
    imports: [
        /**
       * Angular Seed Master
    * StoreModule.forRoot is imported once in the root module, accepting a reducer
    * function or object map of reducer functions. If passed an object of
    * reducers, combineReducers will be run creating your application
    * meta-reducer. This returns all providers for an @ngrx/store
    * based application.
    */
        StoreModule.forRoot(reducers, { metaReducers }),

        /**
         * @ngrx/router-store keeps router state up-to-date in the store.
         */
        StoreRouterConnectingModule,

        /**
         * Store devtools instrument the store retaining past versions of state
         * and recalculating new states. This enables powerful time-travel
         * debugging.
         *
         * To use the debugger, install the Redux Devtools extension for either
         * Chrome or Firefox
         *
         * See: https://github.com/zalmoxisus/redux-devtools-extension
         */
        !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],

        /**
         * EffectsModule.forRoot() is imported once in the root module and
         * sets up the effects class to be initialized immediately when the
         * application starts.
         *
         * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
         */
        EffectsModule.forRoot([])

    ],
    providers: [
        /**
          * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
          * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
          * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
          */
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
    ],
    exports: [StoreModule]
})
export class AppStoreModule { }
