import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DocumentNumbering} from "../../../../../../core/models/documentNumbering";
import {MatPaginator} from "@angular/material/paginator";
import {DocumentFilterComponent} from "../../../../../dashboard-zone/price-offer/components/document-filter/document-filter.component";
import {NumberingService} from "../../../../../../core/services/numbering.service";
import {merge} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";
import {MessageService} from "../../../../../../core/services/message.service";

@Component({
  selector: 'app-numbering-table',
  templateUrl: './numbering-table.component.html',
  styleUrls: ['./numbering-table.component.scss']
})
export class NumberingTableComponent implements AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  documentNumberings: DocumentNumbering[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = [
    "title",
    "type",
    "format",
    "period",
    "actions",
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(DocumentFilterComponent, {static: false}) private documentFilterRef: DocumentFilterComponent

  constructor(
    private numberingService: NumberingService,
    private messageService: MessageService,
  ) {
  }

  ngAfterViewInit() {
    this.paginate();
  }

  public paginate() {
    this.paginator.pageIndex = 0

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.numberingService.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize,
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe((data) => (this.documentNumberings = data));
  }

  destroy(id: number) {
    this.numberingService.destroy(id).subscribe(r => {
      this.paginate();

      this.messageService.add("Ciselnik bol zmazany");
    })
  }
}
