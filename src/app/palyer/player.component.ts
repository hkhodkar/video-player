import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { PlayerService } from '../services/player.service';

@Component({
  selector: 'vpl-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {

  isVideoEnd = false;
  duration = '00:15';
  playSubscription$!: Subscription;
  seekSubscription$!: Subscription;
  completeSubscription$!: Subscription;
  changeVolumeSubscription$!: Subscription;
  @ViewChild('player') videoPlayer!: ElementRef;

  constructor(
    private playerService: PlayerService,

  ) { }



  ngOnInit(): void {
    this.onseeked();
    this.onPlayToggle();
    this.onVolumeChange();
    this.onCompleteProgress();
  }


  updateProgressBar() {
    var percentage = Math.floor((100 / this.videoPlayer.nativeElement.duration) * this.videoPlayer.nativeElement.currentTime);
    this.playerService.onChangeProgress(percentage);
  }

  private onPlayToggle() {
    this.playSubscription$ = this.playerService.playSubject.subscribe({
      next: res => {
        this.isVideoEnd = false;
        res ? this.videoPlayer.nativeElement.play() : this.videoPlayer.nativeElement.pause()
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
        this.videoPlayer.nativeElement.currentTime = value * this.videoPlayer.nativeElement.duration /100;
        this.isVideoEnd = false;
      }

    })
  }

  ngOnDestroy(): void {
    this.playSubscription$!?.unsubscribe();
    this.completeSubscription$?.unsubscribe();
    this.changeVolumeSubscription$!?.unsubscribe();
  }
}
