import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImports } from './MaterialImports';
import { SwiperModule } from 'swiper/angular';
import { SecondsToHoursPipe } from './pipe/seconds-to-hours.pipe';



@NgModule({
  declarations: [SecondsToHoursPipe],
  imports: [
    CommonModule,
    SwiperModule,
    ...MaterialImports
  ],
  exports: [
    SwiperModule,
    SecondsToHoursPipe,
    ...MaterialImports
  ]
})
export class SharedModule { }
