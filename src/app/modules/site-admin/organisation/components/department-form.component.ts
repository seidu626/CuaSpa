import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../models/department';
import { DepartmentsService } from '../services/departments.service';
import { Division } from '@app/modules/site-admin/organisation/models/division';
import { DivisionService } from '@app/modules/site-admin/organisation/services/division.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './views/department-form.component.html'
})
export class DepartmentFormComponent implements OnInit {

  id: number;
  editMode = false;

  deptForm: FormGroup;
  divisions: Division[];

  // required for validation 
  get name() { return this.deptForm.get('name'); }
  get description() { return this.deptForm.get('description'); }
  get divisionCode() { return this.deptForm.get('divisionCode'); }
  get code() { return this.deptForm.get('code'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private departmentService: DepartmentsService, private divisionService: DivisionService) {

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

    const formModel = this.deptForm.value;

    if (this.editMode) {
      formModel["id"] = this.id;
      vbOperation = this.departmentService.put(this.id, formModel);
    }
    else {
      formModel["id"] = 0;
      vbOperation = this.departmentService.post(formModel);
    }

    // Subscribe to observable
    vbOperation.subscribe(
      results => {
        // Emit list event
        //EmitterService.get(this.listId).emit(results);
        // Empty model

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
    this.router.navigate(['/admin/organisation/'], { relativeTo: this.route });
  }

  private initForm() {
    this.divisionService.dataObserver.subscribe(
      (results) => {
        this.divisions = results;
      }
    );

    this.deptForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      divisionCode: ['', Validators.required],
      description: ''
    });

    if (this.editMode) {
      this.departmentService.get(this.id)
        .subscribe((data: Department) => {
          this.deptForm.setValue({
            code: data.code,
            name: data.name,
            divisionCode: data.divisionCode,
            description: data.description
          });
        });
    }

  }

}
