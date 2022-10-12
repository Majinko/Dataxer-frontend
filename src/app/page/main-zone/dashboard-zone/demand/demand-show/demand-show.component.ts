import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {PdfServiceService} from '../../../../../core/services/pdf-service.service';
import {DemandService} from '../../../../../core/services/demand.service';
import {Demand} from '../../../../../core/models/demand';

@Component({
  selector: 'app-demand-show',
  templateUrl: './demand-show.component.html',
  styleUrls: ['./demand-show.component.scss'],
  providers: [DocumentHelper]
})
export class DemandShowComponent implements OnInit {
  documentId: number;
  demand: Demand;
  type: string;
  accepted = true;

  constructor(
    private route: ActivatedRoute,
    public documentHelper: DocumentHelper,
    private pdfService: PdfServiceService,
    private router: Router,
    public demandService: DemandService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.documentId = +this.route.snapshot.paramMap.get('id');
      this.type = this.route.snapshot.paramMap.get('type');

      this.getById();
    });
  }

  private getById() {
    this.demandService.getById(+this.route.snapshot.paramMap.get('demand_id')).subscribe(demand => {
      this.demand = demand;
    });
  }

  pdf(id: number, title: string) {
    this.pdfService.downloadPdf(id, 'demand').subscribe(r => {
      this.documentHelper.pdf(r, title);
    });
  }

  createPriceOffer() {
    this.router.navigate(['/price-offer/create/demand', this.documentId]).then(() => {
    });
  }
}
