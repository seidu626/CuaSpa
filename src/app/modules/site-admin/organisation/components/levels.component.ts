import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../models/department';
import { DepartmentsService } from '../services/departments.service';
import { Level } from '../models/level';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-levels',
  templateUrl: './views/levels.component.html',
})

export class LevelsComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  public rows = new Array<Level>();
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  temp = [];
  columns = [
    { name: 'id' },
    { name: 'code' },
    { name: 'name' },
    { name: 'description' }
  ];



  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: string = 'Delete record?';
  popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;

  ngOnInit(): void {
    this.getLevels();
  }


  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private levelService: LevelService) {
  }

  onAdd() {
    this.router.navigate(['/admin/organisation/addLevel'], { relativeTo: this.route });
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/organisation/addLevel', id], { relativeTo: this.route });
    // Emit edit event
    //EmitterService.get(this.editId).emit(id);
  }

  onDelete(id: number) {
    this.levelService.delete(id).subscribe(
      () => { this.toastr.info("Record successfully deleted.", "Record Deleted"); } //complete
    );
    // Todo: error handling
    //.finally(() => this.loadingIndicator = false);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.VoucherNumber.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  getLevels() {
    this.levelService.dataObserver.subscribe(
      (results) => {
        this.rows = results;
      }
    );

  }

}
