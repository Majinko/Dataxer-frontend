import {Component, Input, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {IDestroy} from '../../../core/interface/IDestroy';
import {MessageService} from '../../../core/services/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-document-destroy-button',
  templateUrl: './document-destroy-button.component.html',
  styleUrls: ['./document-destroy-button.component.scss']
})
export class DocumentDestroyButtonComponent implements OnInit {
  @Input() id: number;
  @Input() tooltip: string;
  @Input() destroyMsg: string;
  @Input() redirectUrl: string;
  @Input() service: IDestroy;

  constructor(
    public dialog: MatDialog,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  destroy(event: MouseEvent) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.service.destroy(this.id).subscribe((r) => {
          this.router.navigate([this.redirectUrl]).then(() => {
            this.messageService.add(this.destroyMsg);
          });
        });
      }
    });
  }
}
