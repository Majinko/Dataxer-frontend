import {Contact} from '../contact';
import {BaseFilter} from './baseFilter';

export class DocumentFilter implements BaseFilter{
  state: { key: string, value: string } | null;
  contact: Contact;
  documentType: string | null;

  [name: string]: any;
}
