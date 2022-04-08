import {FormGroup} from '@angular/forms';
import {Contact} from '../models/contact';

export class AppFilterClass {
  filterForm: FormGroup;

  contacts: Contact[] = [];

  isFiltering: boolean = false;
}
