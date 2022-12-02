import { delay, Subscription, tap } from 'rxjs';
import { SwiperComponent } from "swiper/angular";
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, } from '@angular/core';
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { VideoModel } from './models/video.model';
import { MapTo } from './mapper/video-mapper'
import { VideoBox } from './models/video-box.model';
import { PlayerService } from '../services/player.service';
import { ResponsiveService } from '../services/responsive.service';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'vpl-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {

  isVideoEnd = false;
  duration = '00:15';
  isMobileView = false;
  nextVideo!: VideoBox;
  previousVideo!: VideoBox;
  videos: VideoModel[] = []
  selectedVideo!: VideoModel;
  isPlaying: boolean = false;
  playSubscription$!: Subscription;
  seekSubscription$!: Subscription;
  completeSubscription$!: Subscription;
  selectVideoSubscription$!: Subscription;
  changeVolumeSubscription$!: Subscription;
  @ViewChild('player') videoPlayer!: ElementRef;
  @ViewChild("sliderSwiper") sliderSwiper!: SwiperComponent;


  config: SwiperOptions = {
    spaceBetween: 80,
    centeredSlides: true,
    centerInsufficientSlides: true,
    navigation: true,
    pagination: false,
    width: 150,
  };


  constructor(
    private playerService: PlayerService,
    private responsiveService: ResponsiveService

  ) { }

  ngOnInit(): void {
    this.playerService.playSubject.subscribe(res => {
      this.isPlaying = res;
    })
    this.onseeked();
    this.loadVideos();
    this.changeVideo();
    this.onPlayToggle();
    this.onVolumeChange();
    this.onCompleteProgress();
    this.checkMobileView();

  }

  loadVideos() {
    this.playerService.getVideos().subscribe({
      next: videos => {
        this.videos = videos;
        this.onSelectVideo(0);
      }
    })
  }


  updateProgressBar() {
    var percentage = Math.floor((100 / this.videoPlayer.nativeElement.duration) * this.videoPlayer.nativeElement.currentTime);
    this.playerService.onChangeProgress(percentage);
  }

  onPlay() {
    this.isPlaying ? this.playerService.onPlayNext(false) : this.playerService.onPlayNext(true)
  }

  private onPlayToggle() {
    this.playSubscription$ = this.playerService.playSubject.subscribe({
      next: res => {
        this.isVideoEnd = false;
        res ? this.videoPlayer?.nativeElement?.play() : this.videoPlayer?.nativeElement?.pause()
      }
    })
  }

  private onVolumeChange() {
    this.changeVolumeSubscription$ = this.playerService.changeVolumeSubject.subscribe({
      next: volume => {
        if (volume < 0.10) {
          this.videoPlayer.nativeElement.muted = true;
        } else {
          this.videoPlayer.nativeElement.muted = false;
          this.videoPlayer.nativeElement.volume = volume;
        }
      }
    })
  }

  private onCompleteProgress() {
    this.completeSubscription$ = this.playerService.completeProgressSubject.subscribe({
      next: _ => this.isVideoEnd = true
    })
  }

  private onseeked() {
    this.seekSubscription$ = this.playerService.seekSubject.subscribe({
      next: value => {
        this.videoPlayer.nativeElement.currentTime = value * this.videoPlayer.nativeElement.duration / 100;
        this.isVideoEnd = false;
      }
    })
  }

  private changeVideo() {
    this.selectVideoSubscription$ = this.playerService.selectVideoSubject.pipe(
      tap(index => this.onSelectVideo(index)),
      delay(1000)
    ).subscribe({
      next: _ => this.playerService.onPlayNext(true)
    })
  }


  private onSelectVideo(id: number) {
    let index;
    id == 0 ? index = 0 : index = this.videos.findIndex(item => item.id == id);
    this.selectedVideo = this.videos[index];
    this.duration = this.selectedVideo.time;
    if (index == this.videos.length - 1) {
      this.nextVideo = MapTo(this.videos[0])
    } else {
      this.nextVideo = MapTo(this.videos[index + 1])
    }
    if (index == 0) {
      this.previousVideo = MapTo(this.videos[this.videos.length - 1])
    } else {
      this.previousVideo = MapTo(this.videos[index - 1])
    }
    this.sliderSwiper?.swiperRef.slideTo(index);
  }

  private checkMobileView() {
    this.responsiveService.isResponsiveView().subscribe({
      next: res => {
        if (res.matches) {
          this.isMobileView = true;
        } else {
          this.isMobileView = false;
        }
      }
    })
  }

  onChangeVideo(video: VideoBox) {
    this.playerService.onSelectVideo(video.id)
  }

  ngOnDestroy(): void {
    this.playSubscription$!?.unsubscribe();
    this.completeSubscription$?.unsubscribe();
    this.selectVideoSubscription$!?.unsubscribe();
    this.changeVolumeSubscription$!?.unsubscribe();
  }
}
