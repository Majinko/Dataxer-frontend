import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../../../../core/services/invoice.service';
import {PriceOfferService} from '../../../../../core/services/priceOffer.service';
import {CostService} from '../../../../../core/services/cost.service';
import {ActivatedRoute} from '@angular/router';
import {PriceOffer} from '../../../../../core/models/priceOffer';
import {Invoice} from '../../../../../core/models/invoice';
import {Cost} from '../../../../../core/models/cost';
import {ProjectService} from '../../../../../core/services/project.service';
import {Project, ProjectManHours} from '../../../../../core/models/project';
import {sum} from '../../../../../../helper';
import {Company} from '../../../../../core/models/company';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
  providers: [DocumentHelper]
})
export class ProjectInfoComponent implements OnInit {
  companies: Company[] = [];
  costs: Cost[] = [];
  payedCost: Cost[] = [];
  noPayedCost: Cost[] = [];
  invoices: Invoice[] = [];
  payedInvoices: Invoice[] = [];
  noPayedInvoices: Invoice[] = [];
  priceOffers: PriceOffer[] = [];
  project: Project;
  projectManHours: ProjectManHours;

  requestDone: number = 0;
  priceOfferSum: number = 0;
  costPayedSum: number = 0;
  costNotPayedSum: number = 0;
  invoicePayedSum: number = 0;
  invoiceNotPayedSum: number = 0;

  priceOfferDisplayedColumns: string[] = [
    'id',
    'name'
  ];

  constructor(
    private documentHelper: DocumentHelper,
    private projectService: ProjectService,
    private invoiceService: InvoiceService,
    private priceOfferService: PriceOfferService,
    private costService: CostService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getData(null);
    this.getProject();
    this.getProjectManHours(null);
    this.handleChangeCompany();
  }

  private getProjectManHours(companyIds: number[]) {
    this.projectService.getProjectManHours(+this.route.snapshot.paramMap.get('id'), companyIds).subscribe(manHours => {
      this.projectManHours = manHours;
    });
  }

  private getData(companyIds: number[]) {
    this.requestDone = 0;

    this.invoiceService.findAllByProject(+this.route.snapshot.paramMap.get('id'), companyIds).subscribe(invoices => {
      this.requestDone += 1;
      this.invoices = invoices
        .map((i) => {
          i.price = this.documentHelper.removePercent(i.price, i.discount);

          return i;
        })
        .filter(i => ['INVOICE', 'SUMMARY_INVOICE', 'TAX_DOCUMENT'].includes(i.documentType))
        .sort((a, b) => +b.id - +a.id);

      this.payedInvoices = this.invoices.filter(i => i.paymentDate != null);
      this.noPayedInvoices = this.invoices.filter(i => i.paymentDate === null);
      this.invoicePayedSum = sum(this.invoices.filter(i => i.paymentDate != null), 'price');
      this.invoiceNotPayedSum = sum(this.invoices.filter(i => i.paymentDate === null), 'price');
    });

    this.costService.findAllByProject(+this.route.snapshot.paramMap.get('id'), companyIds).subscribe(costs => {
      this.costs = costs.sort((a, b) => +b.id - +a.id);

      this.requestDone += 1;

      this.payedCost = costs.filter(cost => cost.paymentDate != null);
      this.noPayedCost = costs.filter(cost => cost.paymentDate === null);
      this.costPayedSum = sum(costs.filter(cost => cost.paymentDate != null), 'price');
      this.costNotPayedSum = sum(costs.filter(cost => cost.paymentDate === null), 'price');
    });

    this.priceOfferService.findAllByProject(+this.route.snapshot.paramMap.get('id'), companyIds).subscribe(priceOffers => {
      this.priceOffers = priceOffers.sort((a, b) => +b.id - +a.id);

      this.requestDone += 1;

      this.priceOfferSum = sum(this.priceOffers, 'price');
    });
  }

  private getProject() {
    this.projectService.getById(+this.route.snapshot.paramMap.get('id')).subscribe((project) => {
      this.project = project;
    });
  }

  private handleChangeCompany() {
    this.projectService.getInfoFromCompany.subscribe((ids) => {
      this.getData(ids);
      this.getProjectManHours(ids);
    });
  }
}
