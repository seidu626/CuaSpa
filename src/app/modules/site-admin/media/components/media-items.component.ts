import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MediaItem } from '@app/modules/site-admin/media/models/media-item';
import { MediaItemService } from '@app/modules/site-admin/media/services/media-item.service';


@Component({
  selector: 'app-media-item',
  templateUrl: './views/media-items.component.html'
})
export class MediaItemsComponent implements OnInit {

  public rows$: MediaItem[];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  temp = [];
  columns = [
    { name: 'id' },
    { name: 'published' },
    { name: 'displayOrder' },
    { name: 'mediaType' },
    { name: 'shortDesc' }
  ];



  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: string = 'Delete record?';
  popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;

  ngOnInit(): void {
    this.getLists();
  }


  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private service: MediaItemService) {
  }

  onAdd() {
    this.router.navigate(['/admin/media/addMedia'], { relativeTo: this.route });
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/media/addMedia', id], { relativeTo: this.route });
    // Emit edit event
    //EmitterService.get(this.editId).emit(id);
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe(
      () => { this.toastr.info("Record successfully deleted.", "Record Deleted"); } //complete
    );
    // Todo: error handling
    //
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.VoucherNumber.toLowerCase().indexOf(val) !== -1 || !val;
    });


    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  getLists() {
    this.service.dataObserver.subscribe(
      (data) => {
        this.rows$ = data;
        this.loadingIndicator = false;
      }
    );
  }
}
