import {Contact} from '../contact';

export class ContactSerializer {
  fromJson(contact: Contact): Contact {
    return contact;
  }

  toJson(contact: Contact): Contact {
    return contact;
  }
}
