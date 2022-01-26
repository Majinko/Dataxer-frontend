import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DocumentBase} from '../../../../../../../core/models/documentBase';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent implements OnInit {
  @Input() routerUrl: string;

  @Input() documents: DocumentBase[] = [];

  @Input() displayedColumns: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
