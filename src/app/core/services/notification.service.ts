import {Injectable} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private client: StompJs.Client;
  public newNotification = new Subject<boolean>();

  constructor() {
  }

  public openWebSocket() {
    if (!this.client || this.client.connected) {
      this.client = new StompJs.Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/notifications'),
        debug: (msg: string) => console.log(msg)
      });

      this.client.onConnect = () => {
        this.client.subscribe('/notification/new', (response) => {
          this.newNotification.next(true);
        });
      };

      this.client.activate();
    }
  }
}
