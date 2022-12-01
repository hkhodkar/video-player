import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { ControlsComponent } from './controls/controls.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PlayerComponent,
    ControlsComponent
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
