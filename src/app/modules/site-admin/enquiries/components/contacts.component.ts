import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '@app/domain/services/contact.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './views/contacts.component.html',
})

export class ContactsComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  public rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  temp = [];
  columns = [
    { name: 'id' },
    { name: 'firstname' },
    { name: 'lastname' },
    { name: 'email' },
    { name: 'phone' },
    { name: 'message' }
  ];



  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: string = 'Delete record?';
  popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;

  ngOnInit(): void {
    this.getSections();
  }


  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private service: ContactService) {
  }

  onDetails() {
    this.router.navigate(['/admin/enquiries/contact/'], { relativeTo: this.route });
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

  getSections() {
    this.service.dataObserver.subscribe(
      (results) => {
        this.rows = results;
      }
    );

  }

}
