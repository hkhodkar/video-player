import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImports } from './MaterialImports';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MaterialImports
  ],
  exports:[
    ...MaterialImports
  ]
})
export class SharedModule { }
