import { Component, Input, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'vpl-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  constructor(private responsiveService: ResponsiveService) { }

  isMobileView: boolean = false;

  @Input() title: string = '';

  ngOnInit(): void {
    this.checkMobileView()
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
