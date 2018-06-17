import { Component, ViewChild, ElementRef } from '@angular/core';
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo } from '@progress/kendo-angular-upload';
import { environment } from '@env/environment';

@Component({
  selector: 'app-upload',
  styles: [`
    >>> .img-preview {
      position: relative;
      padding: 10px;
      top: 20px;
    }

    >>> event-log {
      position: relative;
      top: 20px;
    }
  `],
  template: `
      <kendo-upload
        [autoUpload]="false"
        [multiple]="false"
        [saveUrl]="uploadSaveUrl"
        [removeUrl]="uploadRemoveUrl"
        [restrictions]="uploadRestrictions"
        (select)="selectEventHandler($event)"
        (clear)="clearEventHandler($event)"
        (remove)="removeEventHandler($event)"
        (complete)="completeEventHandler($event)">
      </kendo-upload>

      <div *ngIf="imagePreviews.length" class="img-preview example-config">
        <h3>Preview selected images</h3>
        <img *ngFor="let image of imagePreviews"
          [src]="image.src"
          alt="image preview"
          style="width: 200px; margin: 10px;" />
      </div>
  `
  //  <event-log title="Event log" [events]="events"></event-log>

})
export class UploadComponent {
  public events: string[] = [];
  public imagePreviews: FileInfo[] = [];
  public uploadRemoveUrl = environment.baseApiEndpoint + 'fileManager/deleteFiles'; ;
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: [".jpg", ".png", ".jpeg", ".pdf", ".docx", ".doc", ".odx"]
  };
  public uploadSaveUrl = environment.baseApiEndpoint + 'fileManager/uploadFiles'; // should represent an actual API endpoint

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
}

