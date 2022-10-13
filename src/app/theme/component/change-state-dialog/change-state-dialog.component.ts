import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PriceOfferService} from '../../../core/services/priceOffer.service';

@Component({
  selector: 'app-change-state-dialog',
  templateUrl: './change-state-dialog.component.html',
  styleUrls: ['./change-state-dialog.component.scss']
})
export class ChangeStateDialogComponent implements OnInit {
  state: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChangeStateDialogComponent>,
    private priceOfferService: PriceOfferService,
  ) { }

  ngOnInit(): void {
    if (this.data?.element?.state) {
      this.state = this.data.element.state;
    }
  }

  save() {
    this.priceOfferService.changeState(this.data.element.id, this.state).subscribe(r => {
      this.data.element.state = this.state;
      this.dialogRef.close();
    });

  }
}
