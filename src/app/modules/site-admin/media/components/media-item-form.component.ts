import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MediaItemService } from '@app/modules/site-admin/media/services/media-item.service';
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo } from '@progress/kendo-angular-upload';
import { environment } from '@env/environment';


@Component({
  selector: 'app-media-item-form',
  templateUrl: './views/media-item-form.component.html'
})
export class MediaItemFormComponent implements OnInit {

  id: number;
  editMode = false;
  form: FormGroup;
  color = '#ffffff';


  public events: string[] = [];
  public imagePreviews: FileInfo[] = [];
  public uploadRemoveUrl = environment.baseApiEndpoint + 'fileManager/deleteFiles';
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png', '.jpeg', '.pdf', '.docx', '.doc', '.odx', '.mp4']
  };
  public uploadSaveUrl = environment.baseApiEndpoint + 'fileManager/uploadFiles'; // should represent an actual API endpoint



  // required for validation
  get title() { return this.form.get('title'); }
  get shortDesc() { return this.form.get('shortDesc'); }
  get description() { return this.form.get('description'); }
  get displayOrder() { return this.form.get('displayOrder'); }
  get published() { return this.form.get('published'); }
  get seoFilename() { return this.form.get('seoFilename'); }
  get mediaType() { return this.form.get('mediaType'); }
  get width() { return this.form.get('width'); }
  get height() { return this.form.get('height'); }
  get backgroundColor() { return this.form.get('backgroundColor'); }
  get upload() { return this.form.get('upload'); }


  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private service: MediaItemService) {
  }

  ngOnInit() {

    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });

    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
   // console.log(data);
  }

  onSubmit() {
    let vbOperation: Observable<Response>;

    const formModel = this.form.value;
    const uploadedFile = formModel['upload'];
    if (uploadedFile) {
      formModel['size'] = uploadedFile[0]['size'];
      formModel['seoFilename'] = uploadedFile[0]['name'];
      formModel['fileExtension'] = uploadedFile[0]['extension'];
      formModel['upload'] = null;
    }

    if (!formModel['displayOrder']) {
      formModel['displayOrder'] = 0;
    }

    if (this.editMode) {
      formModel['id'] = this.id;
      vbOperation = this.service.put(this.id, formModel);
    } else {
      formModel['id'] = 0;
      vbOperation = this.service.post(formModel);
    }

    // Subscribe to observable
    vbOperation.subscribe(
      results => {
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
    this.router.navigate(['/admin/media'], { relativeTo: this.route });
  }

  private initForm() {

    this.form = this.fb.group({
      title: ['', Validators.required],
      shortDesc: '',
      description: '',
      displayOrder: '',
      published: '',
      upload: '',
      seoFilename: '',
      mediaType: ['', Validators.required],
      width: '',
      height: '',
      backgroundColor: ''

    });

    if (this.editMode) {
      this.service.get(this.id)
        .subscribe((data) => {
          this.form.setValue({
            title: data.title,
            shortDesc: data.shortDesc,
            description: data.description,
            displayOrder: data.displayOrder,
            published: data.published,
            seoFilename: data.seoFilename,
            mediaType: data.mediaType,
            width: data.width,
            height: data.height,
            upload: data.seoFilename,
            backgroundColor: data.backgroundColor
          });
        });

    }
  }

  // file operation
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
  // file operations

}
