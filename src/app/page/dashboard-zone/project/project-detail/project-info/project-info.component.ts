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

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
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
    private projectService: ProjectService,
    private invoiceService: InvoiceService,
    private priceOfferService: PriceOfferService,
    private costService: CostService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.getProject();
    this.getProjectManHours();
  }

  private getProjectManHours(){
    this.projectService.getProjectManHours(+this.route.snapshot.paramMap.get('id')).subscribe(manHours => {
      this.projectManHours = manHours;
    });
  }

  private getData() {
    this.invoiceService.findAllByProject(+this.route.snapshot.paramMap.get('id')).subscribe(invoices => {
      this.requestDone += 1;
      this.invoices = invoices;

      this.payedInvoices = invoices.filter(i => i.paymentDate != null);
      this.noPayedInvoices = invoices.filter(i => i.paymentDate === null);
      this.invoicePayedSum = sum(invoices.filter(i => i.paymentDate != null), 'price');
      this.invoiceNotPayedSum = sum(invoices.filter(i => i.paymentDate === null), 'price');
    });

    this.costService.findAllByProject(+this.route.snapshot.paramMap.get('id')).subscribe(costs => {
      this.costs = costs;

      this.requestDone += 1;

      this.payedCost = costs.filter(cost => cost.paymentDate != null);
      this.noPayedCost = costs.filter(cost => cost.paymentDate === null);
      this.costPayedSum = sum(costs.filter(cost => cost.paymentDate != null), 'price');
      this.costNotPayedSum = sum(costs.filter(cost => cost.paymentDate === null), 'price');
    });

    this.priceOfferService.findAllByProject(+this.route.snapshot.paramMap.get('id')).subscribe(priceOffers => {
      this.priceOffers = priceOffers;

      this.requestDone += 1;

      this.priceOfferSum = sum(this.priceOffers, 'price');
    });
  }

  private getProject() {
    this.projectService.getById(+this.route.snapshot.paramMap.get('id')).subscribe((project) => {
      this.project = project;
    });
  }
}
