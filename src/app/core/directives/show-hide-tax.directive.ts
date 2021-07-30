import {Directive, ElementRef} from '@angular/core';
import {CompanyService} from '../services/company.service';

@Directive({
  selector: '[appShowHideTax]'
})
export class ShowHideTaxDirective {
  constructor(
    private companyService: CompanyService,
    private el: ElementRef
  ) {
    this.el.nativeElement.style.display = this.companyService.company.isTaxPayer ? '' : 'none';
  }
}
