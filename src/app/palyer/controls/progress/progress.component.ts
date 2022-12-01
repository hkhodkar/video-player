import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'vpl-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit, OnDestroy {

  percentage: number = 0
  progressSubscription$!: Subscription;
  constructor(private plyerService: PlayerService) { }

  ngOnInit(): void {
    this.onProgressUpdate()
  }

  private onProgressUpdate() {
    this.progressSubscription$ = this.plyerService.changeProgressSubject.subscribe({
      next: value => {
        if (value === 100) {
          this.percentage = value
          this.plyerService.onCompleteProgress()
        } else {
          this.percentage = value
        }
      }
    })
  }

  changeProgress(event: MatSliderChange) {
    this.plyerService.onSeek(event.value!)
  }


  ngOnDestroy(): void {
    this.progressSubscription$?.unsubscribe()
  }


}
