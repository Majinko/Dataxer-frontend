import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Pack} from '../../../../../core/models/pack';

@Component({
  selector: 'app-demand-offer-pack',
  templateUrl: './demand-offer-pack.component.html',
  styleUrls: ['./demand-offer-pack.component.scss']
})
export class DemandOfferPackComponent implements OnInit {
  priceDemand = {
    price: [],
    totalPrice: []
  };

  @Input() documentHelper: DocumentHelper;
  @Input() formGroup: FormGroup;
  @Input() demandData: Pack[];

  constructor(
  ) { }

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm() {
    this.formGroup.addControl('demand_pack', new FormControl(''));
  }

  formChange() {
    let price = 0;
    this.priceDemand.price.forEach( f => {
      price = price + f;
    });
    this.documentHelper.price = price;

    let totalPrice = 0;
    this.priceDemand.totalPrice.forEach( f => {
      totalPrice = totalPrice + f;
    });
    this.documentHelper.totalPrice = totalPrice;
  }
}
