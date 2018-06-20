import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { MediaItem } from '@app/modules/site-admin/media/models/media-item';


@Component({
  selector: 'app-request-forms',
  templateUrl: './views/request-forms.component.html',
  // styleUrls: ['./views/request-forms.component.scss'],
})
export class RequestFormsComponent implements OnInit {

  @Input() requestForms: Observable<MediaItem>;

  ngOnInit(): void {

  }

  constructor(private router: Router, private route: ActivatedRoute,
    vcr: ViewContainerRef, private settingsService: SettingsService) {
  }
}
