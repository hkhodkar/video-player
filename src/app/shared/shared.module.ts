import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImports } from './MaterialImports';
import { SecondsToHoursPipe } from './pipe/seconds-to-hours.pipe';



@NgModule({
  declarations: [SecondsToHoursPipe],
  imports: [
    CommonModule,
    ...MaterialImports
  ],
  exports: [
    SecondsToHoursPipe,
    ...MaterialImports
  ]
})
export class SharedModule { }
