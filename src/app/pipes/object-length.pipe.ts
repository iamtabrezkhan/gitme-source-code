import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectLength'
})
export class ObjectLengthPipe implements PipeTransform {

  transform(obj: any, ...args: any[]): any {
    if(!obj) {
      return 0;
    }
    return Object.keys(obj).length;
  }

}
