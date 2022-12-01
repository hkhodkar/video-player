import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerComponent } from './player.component';
import { SharedModule } from '../shared/shared.module';
import { ControlsComponent } from './controls/controls.component';
import { VolumeComponent } from './controls/volume/volume.component';
import { ActionsComponent } from './controls/actions/actions.component';
import { ProgressComponent } from './controls/progress/progress.component';



@NgModule({
  declarations: [
    PlayerComponent,
    ControlsComponent,
    ProgressComponent,
    VolumeComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class PalyerModule { }
