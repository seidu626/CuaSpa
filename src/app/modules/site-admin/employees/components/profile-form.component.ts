import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../services/profile.service';
import { MemberType } from '../models/member-type';
import { MemberTypeService } from '../services/member-type.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-profile-form',
  templateUrl: './views/profile-form.component.html'
})
export class ProfileFormComponent implements OnInit {

  id: number;
  editMode = false;
  frmGroup: FormGroup;
  memberTypes: MemberType[];
  @Input() employee: Employee;
  @Output() close = new EventEmitter();


  // required for validation 
  get linkedIn() { return this.frmGroup.get('linkedIn'); }
  get twitter() { return this.frmGroup.get('twitter'); }
  get facebook() { return this.frmGroup.get('facebook'); }
  get description() { return this.frmGroup.get('description'); }
  get shortDescription() { return this.frmGroup.get('shortDescription'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private profileService: ProfileService, private memberTypeService: MemberTypeService) {

  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    let vbOperation: Observable<Response>

    const formModel = this.frmGroup.value;

    if (this.editMode) {
      formModel["id"] = this.id;
      formModel["employeeId"] = this.employee.id;
      vbOperation = this.profileService.put(this.id, formModel);
    }
    else {
      formModel["id"] = 0;
      formModel["employeeId"] = this.employee.id;
      vbOperation = this.profileService.post(formModel);
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
    this.close.emit("profile");
  }

  private initForm() {
    this.memberTypeService.dataObserver.subscribe(
      (results) => {
        this.memberTypes = results;
      }
    );

    this.frmGroup = this.fb.group({
      description: ['', Validators.required],
      shortDescription: ['', Validators.required],
      memberTypeId: ['', Validators.required],
      facebook: ['', Validators.required],
      linkedIn: ['', Validators.required],
      twitter: ['', Validators.required],
    });


    this.profileService.getByEmployeeId(this.employee.id).subscribe(
      (data) => {
        if (data) {
          this.editMode = true;
          this.id = data.id;
          this.frmGroup.setValue({
            description: data.description,
            shortDescription: data.shortDescription,
            memberTypeId: data.memberTypeId,
            facebook: data.facebook,
            twitter: data.twitter,
            linkedIn: data.linkedIn,
          });
        }
      }
    );
  }

}
