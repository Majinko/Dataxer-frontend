import {Component, Input, OnInit} from '@angular/core';
import {ContactService} from '../../../core/services/contact.service';
import {Contact} from '../../../core/models/contact';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

}
