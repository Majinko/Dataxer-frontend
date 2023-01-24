import {Component, Input, OnInit} from '@angular/core';
import {UserOverviewPrice} from '../../../../../../../core/models/user';
import {
  SecurityDialogComponent
} from "../../../../../paginate-zone/components/security-dialog/security-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-project-user-evaluation-table',
  templateUrl: './project-user-evaluation-table.component.html',
  styleUrls: ['./project-user-evaluation-table.component.scss']
})
export class ProjectUserEvaluationTableComponent implements OnInit {
  securityCode: string = '1234';
  isSecurity = false;

  @Input() userOverviewPrice: UserOverviewPrice[] = [];

  securityColumns: string[] = ['name', 'hours', 'hourNetto', 'priceNetto', 'hourBrutto', 'priceBrutto'];
  defaultColumns: string[] = ['name', 'hours', 'hourBrutto', 'priceBrutto'];
  displayedColumns: string[] = this.defaultColumns;

  constructor(
    protected dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }


  security() {
    if (!this.isSecurity) {
      const dialogRef = this.dialog.open(SecurityDialogComponent, {
        maxWidth: '400px',
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          if (this.securityCode === dialogResult.code) {
            this.isSecurity = true;
            this.displayedColumns = this.securityColumns;
          }
        }
      });
    } else {
      this.isSecurity = false;
      this.displayedColumns = this.defaultColumns;
    }
  }

}
