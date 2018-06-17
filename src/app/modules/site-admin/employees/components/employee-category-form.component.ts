import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../models/employee';
import { EmployeeCategoriesService } from '../services/employee-categories.service';
import { EmployeeCategory } from '../models/employee-category';

@Component({
  selector: 'app-employee-category-form',
  templateUrl: './views/employee-category-form.component.html',
})
export class EmployeeCategoryFormComponent implements OnInit {

  id: number;
  editMode = false;
  empCategoryForm: FormGroup;


  // required for validation 
  get name() { return this.empCategoryForm.get('name'); }
  get description() { return this.empCategoryForm.get('description'); }
  get code() { return this.empCategoryForm.get('code'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private employeeCategoriesService: EmployeeCategoriesService) {

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

    const formModel = this.empCategoryForm.value;

    if (this.editMode) {
      formModel["id"] = this.id;
      vbOperation = this.employeeCategoriesService.put(this.id, formModel);
    }
    else {
      formModel["id"] = 0;
      vbOperation = this.employeeCategoriesService.post(formModel);
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
    this.router.navigate(['/admin/employees/categories'], { relativeTo: this.route });
  }

  private initForm() {
    this.empCategoryForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ''
    });

    if (this.editMode) {
      this.employeeCategoriesService.get(this.id)
        .subscribe((data: EmployeeCategory) => {
          this.empCategoryForm.setValue({
            code: data.code,
            name: data.name,
            description: data.description
          });
        });
    }
  }

}
