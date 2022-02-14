import { Component, OnInit } from '@angular/core';
import {PriceOffer} from '../../../../core/models/priceOffer';
import {ActivatedRoute} from '@angular/router';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {PriceOfferService} from '../../../../core/services/priceOffer.service';
import {PdfServiceService} from '../../../../core/services/pdf-service.service';

@Component({
  selector: 'app-demand-show',
  templateUrl: './demand-show.component.html',
  styleUrls: ['./demand-show.component.scss'],
  providers: [DocumentHelper]
})
export class DemandShowComponent implements OnInit {
  documentId: number;
  priceOffer: PriceOffer;

  constructor(
    private route: ActivatedRoute,
    public priceOfferService: PriceOfferService,
    public documentHelper: DocumentHelper,
    private pdfService: PdfServiceService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.documentId = +this.route.snapshot.paramMap.get('id');

      this.getById();
    });
  }

  private getById() {
    this.priceOfferService.getById(2586).subscribe(priceOffer => {
      this.priceOffer = priceOffer;
    });
  }

  pdf(id: number, title: string) {
    this.pdfService.downloadPdf(id, 'priceOffer').subscribe(r => {
      this.documentHelper.pdf(r, title);
    });
  }

}
