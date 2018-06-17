import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadComponent } from '@app/modules/site-admin/media/components/upload.component';
import { EventLogComponent } from '@app/core/components/event-log.component';
import { MediaItemService } from '@app/modules/site-admin/media/services/media-item.service';
import { routing } from '@app/modules/site-admin/media/media-routing.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MediaItemsComponent } from '@app/modules/site-admin/media/components/media-items.component';
import { MediaItemFormComponent } from '@app/modules/site-admin/media/components/media-item-form.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ColorPickerModule } from 'ngx-color-picker';


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
    }),
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgbModule.forRoot(),
    UploadModule,
    ColorPickerModule
  ],
  declarations: [
    EventLogComponent,
    UploadComponent,
    MediaItemsComponent,
    MediaItemFormComponent
  ],
  providers: [
    MediaItemService
  ]
})
export class MediaModule { }
