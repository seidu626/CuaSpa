import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../models/department';
import { DepartmentsService } from '../services/departments.service';
import { DivisionService } from '../services/division.service';
import { Division } from '@app/modules/site-admin/organisation/models/division';

@Component({
  selector: 'app-division-form',
  templateUrl: './views/division-form.component.html'
})
export class DivisionFormComponent implements OnInit {

  id: number;
  editMode = false;

  dataForm: FormGroup;

  // required for validation 
  get name() { return this.dataForm.get('name'); }
  get description() { return this.dataForm.get('description'); }
  get code() { return this.dataForm.get('code'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private divisionService: DivisionService, private departmentsService : DepartmentsService) {

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
      vbOperation = this.divisionService.put(this.id, formModel);
    }
    else {
      formModel["id"] = 0;
      vbOperation = this.divisionService.post(formModel);
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
    this.router.navigate(['/admin/organisation/divisions'], { relativeTo: this.route });
  }

  private initForm() {
   
    this.dataForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required], 
      description: ''
    });

    if (this.editMode) {
      this.divisionService.get(this.id)
        .subscribe((data) => {
          this.dataForm.setValue({
            code: data.code,
            name: data.name,         
            description: data.description
          });
        });
    }

  }

}
