import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserManagerService } from '../services/user-manager.service';
import { UserModel } from '../models/user-model';


@Component({
  selector: 'app-users',
  templateUrl: './views/users.component.html'
})
export class UsersComponent implements OnInit {

  public rows: UserModel[]
  @ViewChild(DatatableComponent) table: DatatableComponent;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  temp = [];
  columns = [
    { name: 'id' },
    { name: 'userName' },
    { name: 'email' },
    { name: 'phoneNumber' },
    { name: 'surname' },
    { name: 'firstname' },
    { name: 'creationTime' }
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
    vcr: ViewContainerRef, private service: UserManagerService) {
  }

  onAdd() {
    this.router.navigate(['/admin/security/addUser'], { relativeTo: this.route });
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/security/addUser', id], { relativeTo: this.route });
    // Emit edit event
    //EmitterService.get(this.editId).emit(id);
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe(
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

  getLists() {
    this.service.dataObserver.subscribe(
      (results) => {
        this.rows = results;
      }
    );

  }

}
