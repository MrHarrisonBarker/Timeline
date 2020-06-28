import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {

    if (args[0] < 1 || args[0] == '' || args[0] == undefined) {
      args[0] = 100;
    }

    if (value == null) {
      return null;
    }

    if (value.length > args[0]) {
      return value.substr(0, args[0]) + '...';
    } else {
      return value;
    }
  }

}
