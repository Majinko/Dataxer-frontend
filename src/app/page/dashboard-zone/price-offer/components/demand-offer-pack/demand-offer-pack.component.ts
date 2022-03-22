import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {FormGroup} from '@angular/forms';
import {DemandItem} from '../../../../../core/models/documentItem';

@Component({
  selector: 'app-demand-offer-pack',
  templateUrl: './demand-offer-pack.component.html',
  styleUrls: ['./demand-offer-pack.component.scss']
})
export class DemandOfferPackComponent implements OnInit, OnChanges {
  @Input() documentHelper: DocumentHelper;
  @Input() formGroup: FormGroup;
  @Input() demandPackItem: DemandItem[];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
