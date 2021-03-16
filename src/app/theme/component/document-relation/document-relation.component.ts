import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DocumentRelationService} from '../../../core/services/document-relation.service';
import {DocumentRelation} from '../../../core/models/documentRelation';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../core/services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {DocumentRelationDialogComponent} from './component/document-relation-dialog/document-relation-dialog.component';

@Component({
  selector: 'app-document-relation',
  templateUrl: './document-relation.component.html',
  styleUrls: ['./document-relation.component.scss']
})
export class DocumentRelationComponent implements OnInit, OnChanges {
  @Input() documentId: number;
  documentRelations: DocumentRelation[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentRelationService: DocumentRelationService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getRelatedDocuments();
    this.storeNewDocumentRelation();
  }

  ngOnChanges() {
    this.getRelatedDocuments();
  }

  getRelatedDocuments() {
    this.documentRelationService.getAllRelationDocuments(this.documentId).subscribe(documents => {
      this.documentRelations = documents;
    });
  }

  showDoc(relatedDocumentId: number, documentType: string) {
    if (documentType === 'PRICE_OFFER') {
      this.router.navigate(['/price-offer/show', relatedDocumentId]).then();
    } else {
      this.router.navigate(['/invoice/show', relatedDocumentId]).then();
    }
  }

  delete($event: MouseEvent, documentId: number, relatedDocumentId: number) {
    $event.stopPropagation();

    this.documentRelationService.destroy(documentId, relatedDocumentId).subscribe(r => {
      this.documentRelations = this.documentRelations.filter(dR => dR.relatedDocumentId !== relatedDocumentId);

      this.messageService.add('Súvisiaci doklad bol zmazaný');
    });
  }

  addRelatedDocument(documentId: number) {
    this.dialog.open(DocumentRelationDialogComponent, {
      width: '100%',
      maxWidth: '750px',
      autoFocus: false,
      data: {
        documentId,
      }
    });
  }

  storeNewDocumentRelation() {
    this.documentRelationService.newDocumentRelation.subscribe(documentRelation => {
      this.documentRelations.push(documentRelation);
    });
  }
}
