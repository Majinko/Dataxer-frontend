import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PackService} from '../../../../../../core/services/pack.service';
import {Pack} from '../../../../../../core/models/pack';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../../../core/services/message.service';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-table',
  templateUrl: './pack-table.component.html',
  styleUrls: ['./pack-table.component.scss']
})
export class PackTableComponent extends PaginateClass<Pack> implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public packService: PackService,
    public messageService: MessageService,
    public dialog: MatDialog,
    private router: Router
  ) {
    super(messageService, packService, dialog);
  }

  ngAfterViewInit() {
    this.paginate();
  }

  showPack(pack: Pack) {
    this.router.navigate(['/pack/show', pack.id]).then();
  }
}
