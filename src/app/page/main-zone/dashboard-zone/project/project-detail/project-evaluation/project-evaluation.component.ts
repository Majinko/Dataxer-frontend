import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimeService} from '../../../../../../core/services/time.service';
import {InvoiceService} from '../../../../../../core/services/invoice.service';
import {CostService} from '../../../../../../core/services/cost.service';
import {Time} from '../../../../../../core/models/time';
import {Invoice} from '../../../../../../core/models/invoice';
import {Cost} from '../../../../../../core/models/cost';
import {ProjectStats} from '../../../../../../core/data/projectStats';
import {monthDiff, sum} from '../../../../../../../helper';
import {ProjectService} from '../../../../../../core/services/project.service';
import {Project, ProjectProfit} from '../../../../../../core/models/project';
import {DocumentTypeEnum} from '../../../../../../core/enums/documentType.enum';
import {MessageService} from '../../../../../../core/services/message.service';

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
  projectId: number;
  sumTimeProfitUser: number = 0;
  projectProfit: ProjectProfit;
  displayedColumns: string[] = ['input', 'user', 'time', 'profit'];

  projectStats: ProjectStats = new ProjectStats(); // TODO vytvorit na backende

  constructor(
    private route: ActivatedRoute,
    private timeService: TimeService,
    private invoiceService: InvoiceService,
    private costService: CostService,
    private messageService: MessageService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.projectId = +this.route.parent.snapshot.paramMap.get('id');

    this.getProject();
    this.getTimes(null);
    this.getInvoices(null);
    this.getCosts(null);
    this.getProjectManHours(null);
    this.handleChangeCompany();
  }

  private getProject() {
    this.projectService.getById(this.projectId).subscribe((project) => {
      this.project = project;
    });
  }

  private getTimes(companyIds: number[]) {
    this.timeService.getAllByProject(this.projectId, companyIds).subscribe((times) => {

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
    this.costService.findAllByProject(this.projectId, companyIds).subscribe((costs) => {
      if (costs.length) {
        this.projectStats.sumCost = sum(costs, 'price');
        this.projectStats.sumInvoices = (this.projectStats.sumInvoices ?? 0) - this.projectStats.sumCost;
      }

      this.countLoads++;
    });
  }

  private getInvoices(companyIds: number[]) {
    this.invoiceService.findAllByProject(this.projectId, companyIds).subscribe((invoices) => {
      invoices = invoices.filter((invoice) => invoice.documentType !== DocumentTypeEnum.PROFORMA);

      if (invoices.length) {
        this.projectStats.sumInvoices = (this.projectStats.sumInvoices ?? 0) + sum(invoices, 'price');
      }

      this.countLoads++;
    });
  }

  private getProjectManHours(companyIds: number[]) {
    this.projectService.getProjectProfitPerson(this.projectId, companyIds).subscribe(manHours => {
      this.projectProfit = manHours;
      this.sumTimeProfitUser = manHours.sumTimeProfitUser;

      this.projectStats.profit = +((this.projectStats.sumInvoices || 0) - (manHours.sumPriceBrutto || 0)).toFixed(2);
      // tslint:disable-next-line:max-line-length
      this.calcCoefficient();

      this.countLoads++;
    });
  }

  private handleChangeCompany() {
    this.projectService.getInfoFromCompany.subscribe((ids) => {
      this.resetProjectStat();

      this.countLoads = 0;

      this.getTimes(ids);
      this.getInvoices(ids);
      this.getCosts(ids);
      this.getProjectManHours(ids);
    });
  }

  private resetProjectStat() {
    this.projectStats.profit = 0;
    this.projectStats.coefficient = 0;
    this.projectStats.sumInvoices = 0;
    this.projectStats.sumCost = 0;
  }

  private calcCoefficient() {
    this.projectStats.coefficient = this.projectStats.timeStamp !== 0 ?
      (this.projectStats.profit / 100 * this.project.projectProfit) / (this.sumTimeProfitUser / 60 / 60) : 0;

    console.log((this.projectStats.profit / 100 * this.project.projectProfit));
    console.log(this.projectStats);
  }

  recallUserProfit() {
    this.sumTimeProfitUser = sum(this.projectProfit.user.filter(user => user.isCalcProfit), 'hours');
    this.calcCoefficient();
  }

  saveUserProjectProfit() {
    const userIds: number[] = this.projectProfit.user.filter(user => user.isCalcProfit).map((user) => user.userId);

    this.projectService.saveProjectUserProfit(this.projectId, userIds).subscribe(() => {
      this.messageService.add('Udaje boli ulozene.');
    });
  }
}
