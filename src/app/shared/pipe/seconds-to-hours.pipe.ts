import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHours'
})
export class SecondsToHoursPipe implements PipeTransform {

  transform(value: number): string {

    const minutes: number = Math.floor(value / 3600);
    const seconds: number = Math.floor(value % 3600);
    const min = minutes < 10 ? '0' + minutes.toString() : minutes;
    const sec = seconds < 10 ? '0' + seconds.toString() : seconds;
    return min + ':' + sec;
  }

}
