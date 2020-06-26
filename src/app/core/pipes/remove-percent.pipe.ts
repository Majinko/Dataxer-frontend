import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'removePercent'
})
export class RemovePercentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const result: any = value - (parseFloat(value) / 100) * parseFloat(args[0]);

    return !isNaN(result) ? result.toFixed(2) : 0;
  }

}
