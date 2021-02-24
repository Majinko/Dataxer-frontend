import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DocumentRelationService} from '../../../../../core/services/document-relation.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DocumentRelation} from '../../../../../core/models/documentRelation';
import {MatTableDataSource} from '@angular/material/table';
import {MessageService} from '../../../../../core/services/message.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-document-relation-dialog',
  templateUrl: './document-relation-dialog.component.html',
  styleUrls: ['./document-relation-dialog.component.scss']
})
export class DocumentRelationDialogComponent implements OnInit {
  formGroup: FormGroup;
  searchTerms = new Subject<string>();
  dataSource = new MatTableDataSource<DocumentRelation>([]);
  displayedColumns: string[] = ['title', 'createdDate', 'totalPrice'];

  constructor(
    private formBuilder: FormBuilder,
    private documentRelationService: DocumentRelationService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DocumentRelationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: null
    });

    this.formGroup.valueChanges.subscribe(v => {
      if (v.title.length > 2) {
        this.searchTerms.next(v.title);
      }
    });

    this.search();
    this.getDocument();
  }

  search() {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.documentRelationService.search(this.data.documentId, term)),
    ).subscribe(documentRelation => {
      this.dataSource.data = documentRelation;
    });
  }

  getDocument() {
    this.documentRelationService.search(this.data.documentId).subscribe(documentRelation => {
      this.dataSource.data = documentRelation;
    });
  }

  makeRelation(documentRelation: DocumentRelation) {
    documentRelation.documentId = this.data.documentId;

    this.documentRelationService.store(documentRelation).subscribe(() => {
      this.dialogRef.close();
      this.messageService.add('Dokumenty boli spárované');
      this.documentRelationService.newDocumentRelation.next(documentRelation);
    }, error => {
      this.messageService.add('Dokumenty už boli v minulosti spárované');
    });
  }
}
