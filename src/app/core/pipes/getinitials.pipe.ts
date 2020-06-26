import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'getinitials'
})
export class GetinitialsPipe implements PipeTransform {
  transform(value: string) {
    return value.replace(/[a-z,č,ď,ľ,ň,š,ť,ž,]/g, '').replace(' ', '');
  }
}
