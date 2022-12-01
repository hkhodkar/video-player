import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vpl-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss'],
})
export class VolumeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  onChangeVolume(e: any) {
    console.log(e);
  }

}
