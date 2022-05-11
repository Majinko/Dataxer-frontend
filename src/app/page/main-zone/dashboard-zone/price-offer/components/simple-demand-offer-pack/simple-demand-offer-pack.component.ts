import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DocumentHelper} from '../../../../../../core/class/DocumentHelper';
import {FormArray, FormGroup} from '@angular/forms';
import {DemandService} from '../../../../../../core/services/demand.service';
import {Pack} from '../../../../../../core/models/pack';
import {clearFormArray} from '../../../../../../../helper';

@Component({
  selector: 'app-simple-demand-offer-pack',
  templateUrl: './simple-demand-offer-pack.component.html',
  styleUrls: ['./simple-demand-offer-pack.component.scss'],
})
export class SimpleDemandOfferPackComponent implements OnInit, OnDestroy {
  pack: Pack[] = [];
  isLoadDemandItem: boolean = true;

  @Input() demandId: number;
  @Input() formGroup: FormGroup;
  @Input() documentHelper: DocumentHelper;

  constructor(
    private demandService: DemandService,
  ) {
  }

  ngOnInit(): void {
    // first clear it when is change complex regime
    clearFormArray(this.formGroup.get('packs') as FormArray);

    this.getDemandItems();
  }

  private getDemandItems() {
    this.demandService.gedDemandPackItem(this.demandId).subscribe(packItems => {
      const emptyPack = new Pack();

      emptyPack.packItems = packItems;

      if (this.pack.length === 0) {
        this.pack.push(emptyPack);
      }

      this.isLoadDemandItem = false;
    });
  }

  ngOnDestroy(): void {
    this.pack = [];
  }
}
