import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vpl-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  constructor() { }

  play: boolean = false;

  ngOnInit(): void {
  }

  onShowClick() {
    this.play = !this.play ;
  }

}
