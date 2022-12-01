import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  seekSubject = new Subject<number>();
  playSubject = new Subject<boolean>();
  changeVolumeSubject = new Subject<number>();
  completeProgressSubject = new Subject<void>();
  changeProgressSubject = new Subject<number>();

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


}

