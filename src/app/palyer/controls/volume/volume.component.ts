import { MatSliderChange } from '@angular/material/slider';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'vpl-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss'],
})
export class VolumeComponent implements OnInit {

  isMute: boolean = false;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  onChangeVolume(event: MatSliderChange) {
    if (event.value! < 10) {
      this.isMute = true;
    } else {
      this.isMute = false;
    }
    this.playerService.onChangeVolume(event.value! / 100);
  }

}
