import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'vpl-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnDestroy {

  constructor(private playerService: PlayerService) { }


  play: boolean = false;
  completeProgressSubscription$!: Subscription;

  ngOnInit(): void {
    this.onCompleteProgress()
  }

  onShowClick() {
    this.play = !this.play;
    this.playerService.onPlayNext(this.play)
  }

  private onCompleteProgress() {
    this.completeProgressSubscription$ = this.playerService.completeProgressSubject.subscribe({
      next: _ => this.play = false
    })
  }

  ngOnDestroy(): void {
    this.completeProgressSubscription$?.unsubscribe();
  }

}
