import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { Observable } from 'rxjs/Observable';
import { MediaItem, IMedia } from '@app/modules/site-admin/media/models/media-item';
import { VgAPI } from 'videogular2/core';




@Component({
  selector: 'app-video-gallery',
  templateUrl: './views/video-gallery.component.html',
})
export class VideoGalleryComponent implements OnInit {

  @Input() videos: Observable<IMedia[]>;

  playlist: Array<IMedia> = [
    //{
    //  title: 'Pale Blue Dot',
    //  src: 'http://static.videogular.com/assets/videos/videogular.mp4',
    //  type: 'video/mp4'
    //},
    //{
    //  title: 'Big Buck Bunny',
    //  src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
    //  type: 'video/mp4'
    //},
    //{
    //  title: 'Elephants Dream',
    //  src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
    //  type: 'video/mp4'
    //}
  ];

  currentIndex = 0;
  currentItem: IMedia;// = this.playlist[this.currentIndex];
  api: VgAPI;


  ngOnInit(): void {
    this.videos.subscribe((data) => {
      this.playlist = data;
      this.currentItem = data[this.currentIndex];
    });
  }


  constructor(private router: Router, private route: ActivatedRoute,
    vcr: ViewContainerRef, private settingsService: SettingsService) {
  }


  onPlayerReady(api: VgAPI) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }

    this.currentItem = this.playlist[this.currentIndex];
  }

  playVideo() {
    this.api.play();
  }

  onClickPlaylistItem(item: IMedia, index: number) {
    this.currentIndex = index;
    this.currentItem = item;
  }



}
