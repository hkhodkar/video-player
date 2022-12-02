import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpl-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  constructor() { }

  @Input() title: string = '';

  ngOnInit(): void {
  }

}
