import { Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor(private responsive: BreakpointObserver) { }

  isResponsiveView() {
    return this.responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait]);
  }

}
