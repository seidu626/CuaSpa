import { Observable } from 'rxjs';
import {map, debounceTime, distinctUntilChanged, tap, merge, switchMap} from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../employees/models/employee';
import { UserManagerService } from '../services/user-manager.service';
import { EmployeeService } from '../../employees/services/employee.service';
import { matchOtherValidator } from '../../../../core/validators/match-other.validator';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PasswordModel } from '../models/user-model';



@Component({
  selector: 'app-user-form',
  templateUrl: './views/user-form.component.html'
})
export class UserFormComponent implements OnInit {

  id: string;
  editMode = false;
  form: FormGroup;
  employees: Observable<Employee[]>;
  tempEmployee: Employee;
  empInfo = '';
  public barLabel = 'Password strength:';
  closeResult: string;
  passwordModel = new PasswordModel();
  modalReference: NgbModalRef;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  // required for validation
  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get phoneNumber() { return this.form.get('phoneNumber'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get userKey() { return this.form.get('userKey'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private service: UserManagerService, private employeesService: EmployeeService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  validPassword() {
    console.log(this.passwordModel);
    return (this.passwordModel.password || this.passwordModel.confirmPassword) &&
      (this.passwordModel.password === this.passwordModel.confirmPassword) ? true : false;
  }

  resetPasssword(e) {
    e.preventDefault();
    this.passwordModel.id = this.id;
    this.modalReference.close();
    this.service.resetPassword(this.id, this.passwordModel).subscribe(
      () => { this.passwordModel = null; }
    );
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.employees.pipe(map((results) => {
          return results.filter(v => (v.firstname.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
            (v.surname.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
            (v.email.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
            (v.phone.indexOf(term) > -1)).slice(0, 10);
        }))),
      tap(() => this.searching = false),
      merge(this.hideSearchingWhenUnsubscribed))

  formatter = (x: { fullname: string }) => x.fullname;

  selectItem(event: any) {
    const item = event.item;
    this.tempEmployee = new Employee(item);
    this.empInfo = this.tempEmployee.surname + ' ' + this.tempEmployee.firstname;
    this.form.patchValue({ phoneNumber: this.tempEmployee.phone});
    this.form.patchValue({ email: this.tempEmployee.email});
    this.form.patchValue({ username: this.tempEmployee.username});
  }

  onSubmit() {
    let vbOperation: Observable<Response>;

    const formModel = this.form.value;

    if (this.editMode) {
      formModel['id'] = this.id;
      vbOperation = this.service.put(this.id, formModel);
    } else {
      formModel['id'] = null;
      vbOperation = this.service.post(formModel);
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
        } else {
          this.toastr.success('Record successfully added.', 'Record Modified');
        }
      },
      err => {
        // Log errors if any
        console.log(err);
      });

    this.onCancel();
  }


  onCancel() {
    this.router.navigate(['/admin/security'], { relativeTo: this.route });
  }

  private initForm() {

    this.employees = this.employeesService.employeesObserver;

    if (this.editMode) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        userKey: ''
      });


    } else {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', [
          Validators.required,
          matchOtherValidator('password')
        ]],
        phoneNumber: '',
        userKey: ''
      });
    }


    if (this.editMode) {
      this.service.get(this.id)
        .subscribe((data) => {
          this.form.setValue({
            username: data.username,
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: '',
            confirmPassword: '',
            userKey: data.userKey
          });
        });

    }
  }


}
