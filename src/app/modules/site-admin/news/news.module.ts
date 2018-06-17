import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { routing } from './news-routing.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsItemService } from '@app/domain/services/news/news-item.service';
import { NewsCommentService } from '@app/domain/services/news/news-comment.service';
import { NewsComponent } from '@app/modules/site-admin/news/containers/news.component';
import { NewsMediaService } from '@app/domain/services/news/news-media.service';
import { NewsItemListComponent } from '@app/modules/site-admin/news/components/news-item-list.component.ts';
import { NewsItemFormComponent } from '@app/modules/site-admin/news/components/news-item-form.component';
import { NewsMediaListComponent } from '@app/modules/site-admin/news/components/news-media-list.component';
import { NewsMediaFormComponent } from '@app/modules/site-admin/news/components/news-media-form.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { NewsMediaComponent } from '@app/modules/site-admin/news/containers/news-media.component';


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
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgbModule.forRoot(),
    UploadModule
  ],
  declarations: [
    NewsComponent,
    NewsItemListComponent,
    NewsItemFormComponent,
    NewsMediaListComponent,
    NewsMediaFormComponent,
    NewsMediaComponent
  ],
  providers: [
    NewsItemService,
    NewsMediaService,
    NewsCommentService,
  ]
})
export class NewsModule { }
