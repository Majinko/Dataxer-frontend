import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[adHost]'
})
export class AdHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
