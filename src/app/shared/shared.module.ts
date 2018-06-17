import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ProgressSpinnerMode } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from '@app/shared/spinner/spinner.component';
import { EmailValidator } from '@app/shared/directives/email.validator.directive';
import { myFocus } from '@app/shared/directives/focus.directive';




@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxDatatableModule,
    NgbModule.forRoot()
  ],
  declarations: [
    SpinnerComponent,
    EmailValidator,
    myFocus

  ],
  providers: [
  ]
})
export class SharedModule { }
