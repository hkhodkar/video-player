import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { VIDEO_LIST } from '../data';
import { VideoModel } from '../palyer/models/video.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  seekSubject = new Subject<number>();
  selectVideoSubject = new Subject<number>();
  changeVolumeSubject = new Subject<number>();
  completeProgressSubject = new Subject<void>();
  changeProgressSubject = new Subject<number>();
  playSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  onPlayNext(value: boolean) {
    this.playSubject.next(value)
  }

  onChangeVolume(value: number) {
    this.changeVolumeSubject.next(value)
  }

  onChangeProgress(value: number) {
    this.changeProgressSubject.next(value)
  }

  onCompleteProgress() {
    this.completeProgressSubject.next()
  }

  onSeek(value: number) {
    this.seekSubject.next(value)
  }

  onSelectVideo(value: number) {
    this.selectVideoSubject.next(value)
  }

  getVideos(): Observable<VideoModel[]> {
    return of(VIDEO_LIST);
  }

}

