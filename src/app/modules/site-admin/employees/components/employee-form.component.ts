import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { EmployeeCategory } from '../models/employee-category';
import { Department } from '../../organisation/models/department';
import { DepartmentsService } from '../../organisation/services/departments.service';
import { EmployeeCategoriesService } from '../services/employee-categories.service';
import { JobRoleService } from '../../organisation/services/job-role.service';
import { JobRole } from '../../organisation/models/job-role';
import { Level } from '@app/modules/site-admin/organisation/models/level';
import { Section } from '@app/modules/site-admin/organisation/models/section';
import { Division } from '@app/modules/site-admin/organisation/models/division';
import { DivisionService } from '@app/modules/site-admin/organisation/services/division.service';
import { SectionService } from '@app/modules/site-admin/organisation/services/section.service';
import { LevelService } from '@app/modules/site-admin/organisation/services/level.service';
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo } from '@progress/kendo-angular-upload';
import { environment } from '@env/environment';

@Component({
  selector: 'app-employee-form',
  templateUrl: './views/employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {

  id: number;
  editMode = false;
  empForm: FormGroup;

  public events: string[] = [];
  public imagePreviews: FileInfo[] = [];
  public uploadRemoveUrl = environment.baseApiEndpoint + 'fileManager/deleteFiles';
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png', '.jpeg']
  };
  public uploadSaveUrl = environment.baseApiEndpoint + 'fileManager/uploadFiles'; // should represent an actual API endpoint


  categories: EmployeeCategory[];
  jobRoles: JobRole[];
  levels: Level[];
  sections: Section[];
  divisions: Division[];
  departments: Department[];
  selectedDeptId = 0;

  // required for validation
  get username() { return this.empForm.get('username'); }
  get categoryCode() { return this.empForm.get('categoryCode'); }
  get departmentCode() { return this.empForm.get('departmentCode'); }
  get divisionCode() { return this.empForm.get('divisionCode'); }
  get sectionCode() { return this.empForm.get('sectionCode'); }
  get levelCode() { return this.empForm.get('levelCode'); }
  get jobRoleCode() { return this.empForm.get('jobRoleCode'); }
  get surname() { return this.empForm.get('surname'); }
  get firstname() { return this.empForm.get('firstname'); }
  get othernames() { return this.empForm.get('othernames'); }
  get phone() { return this.empForm.get('phone'); }
  get email() { return this.empForm.get('email'); }
  get physicalAddress() { return this.empForm.get('physicalAddress'); }
  get postalAddress() { return this.empForm.get('postalAddress'); }
  get avatar() { return this.empForm.get('avatar'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private employeesService: EmployeeService, private departmentsService: DepartmentsService, private jobRoleService: JobRoleService,
    private employeeCategoriesService: EmployeeCategoriesService, private divisionService: DivisionService,
    private sectionService: SectionService, private levelService: LevelService) {

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
    let vbOperation: Observable<Response>;

    const formModel = this.empForm.value;
    const uploadedFile = formModel['avatar'];
    // formModel['size'] = uploadedFile[0]['size'];
    let filename = null;
    if (uploadedFile) {
      filename = uploadedFile[0]['name'];
    }
    // formModel['fileExtension'] = uploadedFile[0]['extension'];


    const formData = new FormData();
    formData.append('username', formModel.username);
    formData.append('surname', formModel.surname);
    formData.append('firstname', formModel.firstname);
    formData.append('othernames', formModel.othernames);
    formData.append('phone', formModel.phone);
    formData.append('email', formModel.email);
    formData.append('jobRoleCode', formModel.jobRoleCode);
    formData.append('divisionCode', formModel.divisionCode);
    formData.append('departmentCode', formModel.departmentCode);
    formData.append('sectionCode', formModel.sectionCode);
    formData.append('levelCode', formModel.levelCode);
    formData.append('categoryCode', formModel.categoryCode);
    formData.append('physicalAddress', formModel.physicalAddress);
    formData.append('postalAddress', formModel.postalAddress);
    formData.append('avatar', filename);


    if (this.editMode) {
      formData.append('id', this.id.toString());
      vbOperation = this.employeesService.put(this.id, formData);
    } else {
      formData.append('id', '0');
      vbOperation = this.employeesService.post(formData);
    }

    // Subscribe to observable
    vbOperation.subscribe(
      results => {
        // Emit list event
        // EmitterService.get(this.listId).emit(results);
        // Empty model

        // Switch editing status
        if (this.editMode) {
          this.editMode = !this.editMode;
          this.toastr.info('Record successfully modified.', 'Record Modified');
        }    else {
          this.toastr.success('Record successfully added.', 'Record Modified');
        }
      },
      err => {
        // Log errors if any
        console.log(err);
      });

    this.onCancel();
  }

  ///#region
  onChangeDept($event) {
    const code = (<HTMLInputElement>$event.target).value.split(':')[1].trim();
   // console.log(id);
    this.jobRoleService.dataObserver.subscribe(
      (results) => {
        this.jobRoles = results.filter(v => v.departmentCode === code);
      }
    );

    this.sectionService.dataObserver.subscribe(
      (results) => {
        this.sections = results.filter(v => v.departmentCode === code);
      }
    );
  }

  onChangeDivision($event) {
    const code = (<HTMLInputElement>$event.target).value.split(':')[1].trim();

    this.departmentsService.departmentObserver.subscribe(
      (results) => {
        this.departments = results.filter(v => v.divisionCode === code);
      }
    );
  }
 //#endregion

  onCancel() {
    this.router.navigate(['/admin/employees'], { relativeTo: this.route });
  }

  private initForm() {

    // observe and fetch divisions
    this.divisionService.dataObserver.subscribe(
      (results) => {
        this.divisions = results;
      }
    );

    this.levelService.dataObserver.subscribe(
      (results) => {
        this.levels = results;
      }
    );


    this.employeeCategoriesService.dataObserver.subscribe(
      (results: EmployeeCategory[]) => {
        this.categories = results;
      }
    );

    this.empForm = this.fb.group({
      categoryCode: ['', Validators.required],
      departmentCode: ['', Validators.required],
      divisionCode: ['', Validators.required],
      sectionCode: ['', Validators.required],
      levelCode: ['', Validators.required],
      jobRoleCode: ['', Validators.required],
      username: ['', Validators.required],
      surname: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: ['', Validators.required],
      othernames: '',
      email: '',
      avatar: '',
      physicalAddress: '',
      postalAddress: ''

    });

    if (this.editMode) {
      this.employeesService.get(this.id)
        .subscribe((data: Employee) => {

          this.jobRoleService.dataObserver.subscribe(
            (results) => {
              this.jobRoles = results.filter(v => v.departmentCode === data.departmentCode);
            }
          );

          this.departmentsService.departmentObserver.subscribe(
            (results) => {
              this.departments = results.filter(v => v.divisionCode === data.divisionCode);
            }
          );

          this.sectionService.dataObserver.subscribe(
            (results) => {
              this.sections = results.filter(v => v.departmentCode === data.departmentCode);
            }
          );

          this.empForm.setValue({
            categoryCode: data.categoryCode,
            departmentCode: data.departmentCode,
            divisionCode: data.divisionCode,
            sectionCode: data.sectionCode,
            levelCode: data.levelCode,
            jobRoleCode: data.jobRoleCode,
            username: data.username,
            surname: data.surname,
            firstname: data.firstname,
            phone: data.phone,
            othernames: data.othernames,
            email: data.email,
            physicalAddress: data.physicalAddress,
            postalAddress: data.postalAddress,
            avatar: ''
          });
        });
    }
  }




  public clearEventHandler(e: ClearEvent): void {
    this.log('Clearing the file upload');
    this.imagePreviews = [];
  }

  public completeEventHandler(e: any) {
    this.log(`All files processed`);
    console.log(e);
  }

  public removeEventHandler(e: RemoveEvent): void {
    this.log(`Removing ${e.files[0].name}`);

    const index = this.imagePreviews.findIndex(item => item.uid === e.files[0].uid);

    if (index >= 0) {
      this.imagePreviews.splice(index, 1);
    }
  }

  public selectEventHandler(e: SelectEvent): void {
    const that = this;

    e.files.forEach((file) => {
      that.log(`File selected: ${file.name}`);

      if (!file.validationErrors) {
        const reader = new FileReader();

        reader.onload = function (ev: any) {
          const image = {
            name: '',
            src: ev.target.result,
            uid: file.uid
          };

          that.imagePreviews.unshift(image);
        };

        reader.readAsDataURL(file.rawFile);
      }
    });
  }

  private log(event: string): void {
    this.events.unshift(`${event}`);
  }

}
