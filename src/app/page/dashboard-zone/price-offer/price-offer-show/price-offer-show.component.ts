import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PriceOfferService} from '../../../../core/services/priceOffer.service';
import {PriceOffer} from '../../../../core/models/priceOffer';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {PdfServiceService} from '../../../../core/services/pdf-service.service';

@Component({
  selector: 'app-price-offer-show',
  templateUrl: './price-offer-show.component.html',
  styleUrls: ['./price-offer-show.component.scss'],
  providers: [DocumentHelper]
})
export class PriceOfferShowComponent implements OnInit {
  documentId: number;
  demandId: number;
  type: string;
  priceOffer: PriceOffer;

  constructor(
    private route: ActivatedRoute,
    public priceOfferService: PriceOfferService,
    public documentHelper: DocumentHelper,
    private pdfService: PdfServiceService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.documentId = +this.route.snapshot.paramMap.get('id');
      this.demandId = +this.route.snapshot.paramMap.get('demandId');
      this.type = this.route.snapshot.paramMap.get('type');

      this.getById();
    });
  }

  private getById() {
    this.priceOfferService.getById(this.documentId).subscribe(priceOffer => {
      this.priceOffer = priceOffer;

      this.documentHelper.prepareTaxes(priceOffer.packs);
    });
  }

  pdf(id: number, title: string) {
    this.pdfService.downloadPdf(id, 'priceOffer').subscribe(r => {
      this.documentHelper.pdf(r, title);
    });
  }

  approve() {
    console.log('approve');
    this.router.navigate(['/document/demand', this.demandId ]).then(() => {
    });
  }

  createOrder() {
    console.log('createOrder');
    this.router.navigate(['/project/create/demand', this.demandId ]).then(() => {
    });
  }
}
