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
import {ProjectManHours} from '../../../../../core/models/project';

@Component({
  selector: 'app-project-evaluation',
  templateUrl: './project-evaluation.component.html',
  styleUrls: ['./project-evaluation.component.scss'],
})
export class ProjectEvaluationComponent implements OnInit {
  times: Time[];
  invoices: Invoice[];
  costs: Cost[];
  countLoads: number = 0;
  projectManHours: ProjectManHours;

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
    this.getTimes();
    this.getCosts();
    this.getInvoices();
    this.getProjectManHours();
  }

  private getTimes() {
    this.timeService.getAllByProject(+this.route.parent.snapshot.paramMap.get('id')).subscribe((times) => {
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

  private getCosts() {
    this.costService.findAllByProject(+this.route.parent.snapshot.paramMap.get('id')).subscribe((costs) => {
      if (costs.length) {
        this.projectStats.sumCost = sum(costs, 'price');
        this.projectStats.sumInvoices = (this.projectStats.sumInvoices ? this.projectStats.sumInvoices : 0) - sum(costs, 'price');
      }

      this.countLoads++;
    });
  }

  private getInvoices() {
    this.invoiceService.findAllByProject(+this.route.parent.snapshot.paramMap.get('id')).subscribe((invoices) => {
      if (invoices.length) {
        this.projectStats.sumInvoices = (this.projectStats.sumInvoices ? this.projectStats.sumInvoices : 0) + sum(invoices, 'price');
      }

      this.countLoads++;
    });
  }

  private getProjectManHours() {
    this.projectService.getProjectManHours(+this.route.parent.snapshot.paramMap.get('id')).subscribe(manHours => {
      this.projectManHours = manHours;
      this.projectStats.profit = +((this.projectStats.sumInvoices || 0) - (this.projectStats.sumCost || 0) - (manHours.sumPriceBrutto || 0)).toFixed(2);

      this.countLoads++;
    });
  }
}
