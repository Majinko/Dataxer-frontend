import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePercentGetNumber'
})
export class RemovePercentGetNumberPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    const result: any = value - (parseFloat(value) / 100) * parseFloat(args[0]);

    return !isNaN(result) ? (value - result).toFixed(2) : 0;
  }

}
