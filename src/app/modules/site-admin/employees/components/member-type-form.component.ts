import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../models/employee';
import { EmployeeCategoriesService } from '../services/employee-categories.service';
import { MemberType } from '../models/member-type';
import { MemberTypeService } from '../services/member-type.service';

@Component({
  selector: 'app-member-type-form',
  templateUrl: './views/member-type-form.component.html'
})
export class MemberTypeFormComponent implements OnInit {

  id: number;
  editMode = false;
  frmGroup: FormGroup;


  // required for validation 
  get name() { return this.frmGroup.get('name'); }
  get description() { return this.frmGroup.get('description'); }
  get code() { return this.frmGroup.get('code'); }
  get isFeatured() { return this.frmGroup.get('isFeatured'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private service: MemberTypeService) {

  }

  ngOnInit() {

    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    let vbOperation: Observable<Response>

    const formModel = this.frmGroup.value;

    if (!formModel['isFeatured']) {
      formModel['isFeatured'] = false;
    }
    if (this.editMode) {
      formModel["id"] = this.id;
      vbOperation = this.service.put(this.id, formModel);
    }
    else {
      formModel["id"] = 0;
      vbOperation = this.service.post(formModel);
    }

    // Subscribe to observable
    vbOperation.subscribe(
      results => {
       
        // Switch editing status
        if (this.editMode) {
          this.editMode = !this.editMode;
          this.toastr.info("Record successfully modified.", "Record Modified");
        }
        else {
          this.toastr.success("Record successfully added.", "Record Modified");
        }
      },
      err => {
        // Log errors if any
        console.log(err);
      });

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/admin/employees/memberTypes'], { relativeTo: this.route });
  }

  private initForm() {
    this.frmGroup = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      isFeatured: '',
      description: '',
    });

    if (this.editMode) {
      this.service.get(this.id)
        .subscribe((data: MemberType) => {
          this.frmGroup.setValue({
            code: data.code,
            name: data.name,
            description: data.description,
            isFeatured: data.isFeatured
          });
        });
    }
  }

}
