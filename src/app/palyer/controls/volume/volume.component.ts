import { MatSliderChange } from '@angular/material/slider';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PlayerService } from 'src/app/services/player.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'vpl-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss'],
})
export class VolumeComponent implements OnInit {
  isMute: boolean = false;
  isMobileView: boolean = false;

  constructor(private playerService: PlayerService, private responsiveService: ResponsiveService) { }

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

}
