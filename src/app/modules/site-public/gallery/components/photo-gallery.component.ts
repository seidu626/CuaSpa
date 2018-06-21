import { Component, OnInit, ViewChild, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable ,  Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import {
  AccessibilityConfig, Action, AdvancedLayout, ButtonEvent, ButtonsConfig, ButtonsStrategy,
  ButtonType, Description, DescriptionStrategy, GalleryService,
  DotsConfig, GridLayout, Image, ImageModalEvent, LineLayout, PlainGalleryConfig, PlainGalleryStrategy, PreviewConfig
} from 'angular-modal-gallery';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { SocialSettings } from '@app/modules/site-admin/settings/models/social-settings';
import { MediaItem } from '@app/modules/site-admin/media/models/media-item';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './views/photo-gallery.component.html',
  styleUrls: ['../styles/photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit, OnDestroy {

  @Input() photos: Observable<MediaItem[]>;





  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private service: SettingsService) {

  }

  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '350px', height: '250' }, { length: 10, wrap: false })
  };

  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  openModalWindow = false;
  imagePointer = 0;

  openModalWindowObservable = false;
  imagePointerObservable = 0;

  images: Array<Image> = [
  ];

  // array of images initialized inside the onNgInit() of this component
  // in an asynchronous way subscribing to an Observable with a delay.
  // This is not a real use-case, but it's a way to simulate a scenario where
  // you have to subscribe to an Observable to get data and to set public vars
  imagesArraySubscribed: Array<Image>;



  ngOnInit() {
    this.photos.subscribe(m => {
      console.log('images');
      console.log(m);
      console.log('end images');
      this.images = m.map(x => {
        return new Image(
        x.id,
          {// // modal
            img: x.path,
            title: x.title,
            description:  x.title, // no description
          },
          {// // plain
            img: x.thumbPath,
            title: x.title,
            description: x.title, // no description
          },
        );
      });
    });
  }


  ngOnDestroy() {
  }


  openImageModalRowDescription(image: Image) {
    console.log('Opening modal gallery from custom plain gallery row and description, with image: ', image);
    const index: number = this.getCurrentIndexCustomLayout(image, this.images);
    this.customPlainGalleryRowDescConfig =
    Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(index, true) });
  }


  onCustomButtonAfterHook(event: ButtonEvent, galleryId: number | undefined) {
    console.log('onCustomButtonAfterHook with galleryId=' + galleryId + ' and event: ', event);
    if (!event || !event.button) {
      return;
    }
    // Invoked after both a click on a button and its related action.
  }

  onImageLoaded(event: ImageModalEvent) {
    // angular-modal-gallery will emit this event if it will load successfully input images
    console.log('onImageLoaded action: ' + Action[event.action]);
    console.log('onImageLoaded result:' + event.result);
  }

  onVisibleIndex(event: ImageModalEvent) {
    console.log('onVisibleIndex action: ' + Action[event.action]);
    console.log('onVisibleIndex result:' + event.result);
  }

  onIsFirstImage(event: ImageModalEvent) {
    console.log('onIsFirstImage onfirst action: ' + Action[event.action]);
    console.log('onIsFirstImage onfirst result:' + event.result);
  }

  onIsLastImage(event: ImageModalEvent) {
    console.log('onIsLastImage onlast action: ' + Action[event.action]);
    console.log('onIsLastImage onlast result:' + event.result);
  }

  onCloseImageModal(event: ImageModalEvent) {
    console.log('onClose action: ' + Action[event.action]);
    console.log('onClose result:' + event.result);
    this.customPlainGalleryRowDescConfig =
    Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(-1, true) });
  }

  addRandomImage() {
    const imageToCopy: Image = this.images[Math.floor(Math.random() * this.images.length)];
    const newImage: Image = new Image(this.images.length - 1 + 1, imageToCopy.modal, imageToCopy.plain);
    this.images = [...this.images, newImage];
  }

  trackById(index: number, item: Image) {
    return item.id;
  }

  private getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  }
}

