import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {

  public employees: Employee[];
  public employee: Employee;
  temp = [];
  list: boolean;
  profile: boolean;

  ngOnInit(): void {
    this.list = true;
    this.profile = false;
    this.getList();
  }


  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private employeesService: EmployeeService) {
  }

  onProfile(id: number) {
    this.employeesService.get(id).subscribe((data) => {
      this.employee = data;
      this.profile = true;
      this.list = false;
    });
}


  onAdd(event) {
    this.router.navigate(['/admin/employees/addEmployee'], { relativeTo: this.route });
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/employees/addEmployee', id], { relativeTo: this.route });
    // Emit edit event
    // EmitterService.get(this.editId).emit(id);
  }

  onDelete(id: number) {
    this.employeesService.delete(id).subscribe(
      () => { this.toastr.info('Record successfully deleted.', 'Record Deleted'); } // complete
    );
    // Todo: error handling
    // .finally(() => this.loadingIndicator = false);
  }

  close(component: string) {
    if (component === 'profile') {
      this.profile = false;
      this.list = true;
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.VoucherNumber.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.employees = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }


  getList() {
    this.employeesService.employeesObserver.subscribe(
      (results: Employee[]) => {
        this.employees = results;
      }
    );

  }

}
