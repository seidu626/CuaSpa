import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NewsItem } from '@app/domain/models/news/news-item';
import { NewsItemService } from '@app/domain/services/news/news-item.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-news-item-form',
  templateUrl: './views/news-item-form.component.html',
})
export class NewsItemFormComponent implements OnInit {

  id: number;
  editMode = false;
  frmGroup: FormGroup;
  @Input() newsItem: NewsItem;
  @Output() close = new EventEmitter();
  startDateModel: NgbDateStruct;
  endDateModel: NgbDateStruct;

  // required for validation

  get author() { return this.frmGroup.get('author'); }
  get title() { return this.frmGroup.get('title'); }
  get quote() { return this.frmGroup.get('quote'); }
  get short() { return this.frmGroup.get('short'); }
  get full() { return this.frmGroup.get('full'); }
  get published() { return this.frmGroup.get('published'); }
  get startDateUtc() { return this.frmGroup.get('startDateUtc'); }
  get endDateUtc() { return this.frmGroup.get('endDateUtc'); }
  get allowComments() { return this.frmGroup.get('allowComments'); }
  get metaKeywords() { return this.frmGroup.get('metaKeywords'); }
  get metaDescription() { return this.frmGroup.get('metaDescription'); }
  get metaTitle() { return this.frmGroup.get('metaTitle'); }
  get publishedDate() { return this.frmGroup.get('publishedDate'); }

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private toastr: ToastrService, private service: NewsItemService) {
  }

  ngOnInit() {
    this.initForm();

    this.
      frmGroup.
      valueChanges.
      subscribe(form => {
        sessionStorage.setItem('_news_item_', JSON.stringify(form));
      });

  }

  onSubmit() {
    let operation: Observable<Response>;
    const formModel = this.frmGroup.value;
    // format date from array to date object;
    // fall back to this if json converter on the server fails
    let date = formModel['startDateUtc'];
    formModel['startDateUtc'] = `${date['month']}/${date['day']}/${date['year']}`;

    date = formModel['endDateUtc'];
    formModel['endDateUtc'] = `${date['month']}/${date['day']}/${date['year']}`;

    if (!formModel['allowComments']) {
      formModel['allowComments'] = false;
    }
    if (!formModel['published']) {
      formModel['published'] = false;
    }

    if (this.editMode) {
      formModel['id'] = this.newsItem.id;
      operation = this.service.put(this.id, formModel);
    } else {
      formModel['id'] = '0';
      operation = this.service.post(formModel);
    }

    // Subscribe to observable
    operation.subscribe(
      results => {
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


  //#endregion

  onCancel() {
    this.close.emit({ component: 'news_item_list'});
  }

  private initForm() {

    let date = new Date();
    this.startDateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    this.endDateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };

    // observe and fetch departments

    this.frmGroup = this.fb.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      short: ['', Validators.required],
      full: ['', Validators.required],
      quote: '',
      published: '',
      startDateUtc: '',
      endDateUtc: '',
      allowComments: '',
      metaKeywords: '',
      metaDescription: '',
      metaTitle: '',

    });

    this.frmGroup.patchValue({ startDateUtc: this.startDateModel });
    this.frmGroup.patchValue({ endDateUtc: this.endDateModel });

    if (this.newsItem != null) {
      this.editMode = true;
      this.id = this.newsItem.id;
      date = new Date(this.newsItem.startDateUtc);
      this.startDateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };

      date = new Date(this.newsItem.endDateUtc);
      this.endDateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };

      this.frmGroup.setValue({
        title: this.newsItem.title,
        author: this.newsItem.author,
        allowComments: this.newsItem.allowComments,
        // approvedCommentCount: this.newsItem.approvedCommentCount,
        endDateUtc: this.endDateModel,
        startDateUtc: this.startDateModel,
        full: this.newsItem.full,
        short: this.newsItem.short,
        quote: this.newsItem.quote,
        metaDescription: this.newsItem.metaDescription,
        metaKeywords: this.newsItem.metaKeywords,
        metaTitle: this.newsItem.metaTitle,
        // notApprovedCommentCount: this.newsItem.notApprovedCommentCount,
        published: this.newsItem.published,
       // publishedDate: this.newsItem.publishedDate,
      });

    }

  }
}
