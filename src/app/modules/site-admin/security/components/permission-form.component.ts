import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../services/permission.service';



@Component({
  selector: 'app-permission-form',
  templateUrl: './views/permission-form.component.html'
})
export class PermissionFormComponent implements OnInit {

  id: number;
  editMode = false;
  form: FormGroup;

  // required for validation 
  get name() { return this.form.get('name'); }
  get action() { return this.form.get('action'); }
  get resource() { return this.form.get('resource'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private service: PermissionService) {
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

    const formModel = this.form.value;

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
    this.router.navigate(['/admin/security/permissions'], { relativeTo: this.route });
  }

  private initForm() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      action: ['', Validators.required],
      resource: ['', Validators.required],
    });

    if (this.editMode) {
      this.service.get(this.id)
        .subscribe((data) => {
          this.form.setValue({
            name: data.name,
            action: data.action,
            resource: data.resource
          });
        });

    }
  }


}
