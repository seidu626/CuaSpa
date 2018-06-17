import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { NewsItem } from '@app/domain/models/news/news-item';
import { NewsItemService } from '@app/domain/services/news/news-item.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NewsMedia } from '@app/domain/models/news/news-media';
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo } from '@progress/kendo-angular-upload';
import { environment } from '@env/environment';
import { NewsMediaService } from '@app/domain/services/news/news-media.service';


@Component({
  selector: 'app-news-media-form',
  templateUrl: './views/news-media-form.component.html',
})
export class NewsMediaFormComponent implements OnInit {

  id: number;
  editMode = false;
  frmGroup: FormGroup;
  @Input() newsItemId: number;
  @Input() newsMedia: NewsMedia;
  @Output() close = new EventEmitter();


  public events: string[] = [];
  public imagePreviews: FileInfo[] = [];
  public uploadRemoveUrl = environment.baseApiEndpoint + 'fileManager/deleteFiles';;
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: [".jpg", ".png", ".jpeg", ".pdf", ".docx", ".doc", ".odx"]
  };
  public uploadSaveUrl = environment.baseApiEndpoint + 'fileManager/uploadFiles'; // should represent an actual API endpoint

  // required for validation

  get title() { return this.frmGroup.get('title'); }
  get isFeatured() { return this.frmGroup.get('isFeatured'); }
  get shortDesc() { return this.frmGroup.get('shortDesc'); }
  get description() { return this.frmGroup.get('description'); }
  get published() { return this.frmGroup.get('published'); }
  get displayOrder() { return this.frmGroup.get('displayOrder'); }
  get upload() { return this.frmGroup.get('upload'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private toastr: ToastrService, private service: NewsMediaService) {
  }

  ngOnInit() {
    this.initForm();

    this.
      frmGroup.
      valueChanges.
      subscribe(form => {
      //  sessionStorage.setItem('_news_media_', JSON.stringify(form));
      });

  }

  onSubmit() {
    let operation: Observable<Response>

    const formModel = this.frmGroup.value;
    formModel['newsItemId'] = this.newsItemId;
    let uploadedFile = formModel['upload'];
    formModel['size'] = uploadedFile[0]['size'];
    formModel['path'] = uploadedFile[0]['name'];
    formModel['fileExtension'] = uploadedFile[0]['extension'];
    formModel['upload'] = null;

    formModel['newsItemId'] = this.newsItemId;

    if (!formModel['isFeatured']) {
      formModel['isFeatured'] = false;
    }
    if (!formModel['published']) {
      formModel['published'] = false;
    }


    if (this.editMode) {
      formModel["id"] = this.newsMedia.id;
      operation = this.service.put(this.id, formModel);
    }
    else {
      formModel["id"] = "0";
      operation = this.service.post(formModel);
    }

    // Subscribe to observable
    operation.subscribe(
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
    this.close.emit({component: 'news_media_list', id: this.newsItemId});
  }

  private initForm() {

    //observe and fetch departments

    this.frmGroup = this.fb.group({
      title: ['', Validators.required],
      shortDesc: '',
      description: '',
      published: '',
      displayOrder: '',
      isFeatured: '',
      upload: '',
    });

    if (this.newsMedia != null) {
      this.editMode = true;
      this.id = this.newsMedia.id;
      this.frmGroup.setValue({
        title: this.newsMedia.title,
        shortDesc: this.newsMedia.shortDesc,
        description: this.newsMedia.description,
        displayOrder: this.newsMedia.displayOrder,
        published: this.newsMedia.published,
        isFeatured: this.newsMedia.isFeatured,
        upload: this.newsMedia.path,
      });

    }

  }

  //file operation
  public clearEventHandler(e: ClearEvent): void {
    this.log("Clearing the file upload");
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
  //file operations
}
