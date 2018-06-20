import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { SettingInfo } from '@app/modules/site-admin/settings/models/settingInfo';

@Component({
  selector: 'app-settings-form',
  templateUrl: './views/settings-form.component.html',
})
export class SettingsFormComponent implements OnInit {

  id: number;
  editMode = false;
  frmGroup: FormGroup;
  @Input() setting: SettingInfo;
  @Output() close = new EventEmitter();
  
  // required for validation
  get name() { return this.frmGroup.get('name'); }
  get value() { return this.frmGroup.get('value'); }
  get description() { return this.frmGroup.get('description'); }


  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private toastr: ToastrService, private service: SettingsService) {
  }

  ngOnInit() {

    this.initForm();
  }

  onSubmit() {
    let vbOperation: Observable<Response>

    const formModel = this.frmGroup.value;
  
    if (this.editMode) {
      formModel["id"] = this.setting.id;
      vbOperation = this.service.put(this.id, formModel);
    }
    else {
      formModel["id"] = "0";
      vbOperation = this.service.post(formModel);
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


 //#endregion 

  onCancel() {
    this.close.emit("list");
  }

  private initForm() {
    
    //observe and fetch departments

    this.frmGroup = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      description: ''
    });

    if (this.setting != null) {
      this.editMode = true;
      this.id = this.setting.id;
      this.frmGroup.setValue({
        name: this.setting.name,
        value: this.setting.value,
        description: this.setting.description
      });

    }
 
  }
}
