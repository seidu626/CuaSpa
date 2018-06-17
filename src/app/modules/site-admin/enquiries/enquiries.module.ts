import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ContactService } from '@app/domain/services/contact.service';
import { routing } from '@app/modules/site-admin/enquiries/enquiries-routing.module';
import { ContactsComponent } from '@app/modules/site-admin/enquiries/components/contacts.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';




@NgModule({
  imports: [
    CommonModule,
    routing,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: 'danger',
      confirmButtonType: 'info' // set defaults here
    })
  ],
  declarations: [
    ContactsComponent,
  ],
  providers: [
    ContactService
  ]
})
export class EnquiriesModule { }
