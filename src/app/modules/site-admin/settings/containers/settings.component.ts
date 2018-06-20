import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '@app/modules/site-admin/employees/models/employee';
import { SettingInfo } from '@app/modules/site-admin/settings/models/settingInfo';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  public settings: SettingInfo[]
  public setting: SettingInfo;
  temp = [];
  list: boolean;
  edit: boolean;

  ngOnInit(): void {
    this.list = true;
    this.edit = false;
    this.getList();
  }


  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private service: SettingsService) {
  }



  onAdd(event) {
    this.edit = true;
    this.list = false;
  }

  onEdit(id: number) {
    this.service.get(id).subscribe((data) => {
      this.setting = data;
      this.edit = true;
      this.list = false;
    })
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe(
      () => { this.toastr.info("Record successfully deleted.", "Record Deleted"); } //complete
    );
  }

  close(component: string) {
    if (component == 'list') {
      this.edit = false;
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
    this.settings = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }


  getList() {
    this.service.dataObserver.subscribe(
      (results) => {
        this.settings = results;
      }
    );

  }

}
