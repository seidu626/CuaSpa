import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../models/department';
import { DepartmentsService } from '../services/departments.service';
import { JobRoleService } from '../services/job-role.service';

@Component({
  selector: 'app-job-role-form',
  templateUrl: './views/job-role-form.component.html'
})
export class JobRoleFormComponent implements OnInit {

  id: number;
  editMode = false;

  dataForm: FormGroup;
  departments: Department[];

  // required for validation 
  get name() { return this.dataForm.get('name'); }
  get departmentCode() { return this.dataForm.get('departmentCode'); }
  get description() { return this.dataForm.get('description'); }
  get code() { return this.dataForm.get('code'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private jobRoleService: JobRoleService, private departmentsService : DepartmentsService) {

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

    const formModel = this.dataForm.value;

    if (this.editMode) {
      formModel["id"] = this.id;
      vbOperation = this.jobRoleService.put(this.id, formModel);
    }
    else {
      formModel["id"] = 0;
      vbOperation = this.jobRoleService.post(formModel);
    }

    // Subscribe to observable
    vbOperation.subscribe(
      results => {
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
    this.router.navigate(['/admin/organisation/jobRoles'], { relativeTo: this.route });
  }

  private initForm() {
    this.departmentsService.departmentObserver.subscribe(
      (results) => {
        this.departments = results;
      }
    );

    this.dataForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      departmentCode: ['', Validators.required],
      description: ''
    });

    if (this.editMode) {
      this.jobRoleService.get(this.id)
        .subscribe((data) => {
          this.dataForm.setValue({
            code: data.code,
            name: data.name,
            departmentCode: data.departmentCode,
            description: data.description
          });
        });
    }

  }

}
