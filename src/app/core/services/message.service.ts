import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  appMessage = new Subject();

  add(message: string): void {
    this.appMessage.next(message);
  }
}
