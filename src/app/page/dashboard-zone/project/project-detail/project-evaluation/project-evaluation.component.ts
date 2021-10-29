import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimeService} from '../../../../../core/services/time.service';
import {InvoiceService} from '../../../../../core/services/invoice.service';
import {CostService} from '../../../../../core/services/cost.service';
import {Time} from '../../../../../core/models/time';
import {Invoice} from '../../../../../core/models/invoice';
import {Cost} from '../../../../../core/models/cost';
import {ProjectStats} from '../../../../../core/data/projectStats';
import {monthDiff, sum} from '../../../../../../helper';
import {ProjectService} from '../../../../../core/services/project.service';
import {Project, ProjectManHours} from '../../../../../core/models/project';

@Component({
  selector: 'app-project-evaluation',
  templateUrl: './project-evaluation.component.html',
  styleUrls: ['./project-evaluation.component.scss'],
})
export class ProjectEvaluationComponent implements OnInit {
  times: Time[];
  invoices: Invoice[];
  costs: Cost[];
  project: Project;
  countLoads: number = 0;
  projectManHours: ProjectManHours;
  displayedColumns: string[] = ['input', 'user', 'time', 'profit'];

  projectStats: ProjectStats = new ProjectStats();

  constructor(
    private route: ActivatedRoute,
    private timeService: TimeService,
    private invoiceService: InvoiceService,
    private costService: CostService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.getProject();
    this.getTimes(null);
    this.getInvoices(null);
    this.getCosts(null);
    this.getProjectManHours(null);
    this.handleChangeCompany();
  }

  private getProject() {
    this.projectService.getById(+this.route.parent.snapshot.paramMap.get('id')).subscribe((project) => {
      this.project = project;
    });
  }

  private getTimes(companyIds: number[]) {
    this.timeService.getAllByProject(+this.route.parent.snapshot.paramMap.get('id'), companyIds).subscribe((times) => {

      if (times.length) {
        this.projectStats.countUser = [...new Set(times.map(time => time?.user?.uid))].length;
        this.projectStats.start = times && times[0].dateWork;
        this.projectStats.end = times && times[times.length - 1].dateWork;
        this.projectStats.countMonth = monthDiff(this.projectStats.start, this.projectStats.end);
        this.projectStats.timeStamp = sum(times, 'time');
      }

      this.countLoads++;
    });
  }

  private getCosts(companyIds: number[]) {
    this.costService.findAllByProject(+this.route.parent.snapshot.paramMap.get('id'), companyIds).subscribe((costs) => {
      if (costs.length) {
        this.projectStats.sumCost = sum(costs, 'price');
        this.projectStats.sumInvoices = (this.projectStats.sumInvoices ? this.projectStats.sumInvoices : 0) - sum(costs, 'price');
      }

      this.countLoads++;
    });
  }

  private getInvoices(companyIds: number[]) {
    this.invoiceService.findAllByProject(+this.route.parent.snapshot.paramMap.get('id'), companyIds).subscribe((invoices) => {
      if (invoices.length) {
        this.projectStats.sumInvoices = (this.projectStats.sumInvoices ? this.projectStats.sumInvoices : 0) + sum(invoices, 'price');
      }

      this.countLoads++;
    });
  }

  private getProjectManHours(companyIds: number[]) {
    this.projectService.getProjectManHours(+this.route.parent.snapshot.paramMap.get('id'), companyIds).subscribe(manHours => {
      this.projectManHours = manHours;
      // tslint:disable-next-line:max-line-length
      this.projectStats.profit = +((this.projectStats.sumInvoices || 0) - (this.projectStats.sumCost || 0) - (manHours.sumPriceBrutto || 0)).toFixed(2);
      // tslint:disable-next-line:max-line-length
      this.projectStats.coefficient = this.projectStats.timeStamp !== 0 ? (this.projectStats.profit / 100 * this.project.projectProfit) / (this.projectStats.timeStamp / 60 / 60) : 0;

      this.countLoads++;
    });
  }

  private handleChangeCompany() {
    this.projectService.getInfoFromCompany.subscribe((ids) => {
      this.countLoads = 0;

      this.getTimes(ids);
      this.getInvoices(ids);
      this.getCosts(ids);
      this.getProjectManHours(ids);
    });
  }
}
