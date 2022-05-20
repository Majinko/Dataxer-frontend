import {AppPaginate} from './AppPaginate';
import {IPaginate} from '../interface/IPaginate';
import {GodButtonService} from '../services/god-button.service';
import {MessageService} from '../services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {FilterService} from '../store/service/filter.service';
import {DocumentService} from '../services/document.service';
import {downloadFile} from '../../../helper';

export class AppDocumentPaginate<T> extends AppPaginate<T> {
  constructor(
    protected service: IPaginate<T>,
    protected godButtonService: GodButtonService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected route: ActivatedRoute,
    protected filterService: FilterService,
    protected documentService: DocumentService
  ) {
    super(service, godButtonService, messageService, dialog, route, filterService);
  }

  downloadPfsInZip(documentType: string) {
    this.isLoadingResults = true;
    this.messageService.add('Začalo sa generovanie pdf');

    this.documentService.downloadPfsInZip(documentType, this.filterService.filter.rsQlFilter).subscribe(f => {
      downloadFile(f);

      this.isLoadingResults = false;
    });
  }
}
