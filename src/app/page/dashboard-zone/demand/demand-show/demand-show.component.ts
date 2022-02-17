import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {PriceOfferService} from '../../../../core/services/priceOffer.service';
import {PdfServiceService} from '../../../../core/services/pdf-service.service';
import {DemandService} from '../../../../core/services/demand.service';
import {Demand} from '../../../../core/models/demand';

@Component({
  selector: 'app-demand-show',
  templateUrl: './demand-show.component.html',
  styleUrls: ['./demand-show.component.scss'],
  providers: [DocumentHelper]
})
export class DemandShowComponent implements OnInit {
  documentId: number;
  demand: Demand;
  accepted = true;

  constructor(
    private route: ActivatedRoute,
    public priceOfferService: PriceOfferService,
    public documentHelper: DocumentHelper,
    private pdfService: PdfServiceService,
    private router: Router,
    public demandService: DemandService,
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
      this.demand = priceOffer;
    });
  }

  pdf(id: number, title: string) {
    this.pdfService.downloadPdf(id, 'demand').subscribe(r => {
      this.documentHelper.pdf(r, title);
    });
  }

  createPriceOffer() {
    console.log('createPriceOffer');
    this.router.navigate(['/price-offer/create/demand', this.documentId ]).then(() => {
    });
  }
}
