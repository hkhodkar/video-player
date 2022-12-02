import { MatSliderChange } from '@angular/material/slider';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'vpl-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss'],
})
export class VolumeComponent implements OnInit {
  isMute: boolean = false;
  isMobileView: boolean = false;
  changeVolume = new Subject<number>();

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.changeVolume.subscribe(res => {
      this.onChangeVolume(res);

    })
  }

  onChangeVolume(value: number) {
    if (value! < 10) {
      this.isMute = true;
    } else {
      this.isMute = false;
    }
    this.playerService.onChangeVolume(value! / 100);
  }

}
