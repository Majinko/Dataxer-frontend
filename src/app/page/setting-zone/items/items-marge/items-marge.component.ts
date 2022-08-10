import { Component, OnInit } from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {MessageService} from '../../../../core/services/message.service';
import {ItemMargeService} from '../../../../core/services/item-marge.service';

@Component({
  selector: 'app-items-marge',
  templateUrl: './items-marge.component.html',
  styleUrls: ['./items-marge.component.scss']
})
export class ItemsMargeComponent implements OnInit {
  value: number = 10;
  start: number = 5;
  highValue: number = 20;
  show = true;
  options: Options = {
    floor: this.start,
    ceil: 100,
    step: 1,
    minRange: 1,
    minLimit: this.start + 1,
  };

  constructor(
    private itemMargeService: ItemMargeService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getMarge();
  }

  private getMarge() {
    this.itemMargeService.get().subscribe(r => {
      if (r) {
        this.start = r.marge1;
        this.value = r.marge2;
        this.highValue = r.marge3;
        this.options = {
          floor: this.start,
          ceil: 100,
          step: 1,
          minRange: 1,
          minLimit: this.start + 1,
        };
      }
    }, error => {
      this.messageService.add('Nastala chyba');
    });
  }

  save() {
    const formData = {
      marge1: this.start,
      marge2: this.value,
      marge3: this.highValue
    };
    this.itemMargeService.storeOrUpdate(formData).subscribe(r => {
      this.messageService.add('Nastavenie marže bolo aktualizované');
    }, error => {
      this.messageService.add('Nastala chyba');
    });
  }

  inputChanged($event: any) {
    if ($event > 98) {
      this.start = 98;
    }
    if (!$event) {
      this.start = 2;
    }
    this.options = {
      floor: this.start,
      ceil: 100,
      step: 1,
      minRange: 1,
      minLimit: this.start + 1,
    };
  }
}
