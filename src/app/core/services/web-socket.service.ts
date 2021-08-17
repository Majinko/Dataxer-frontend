import {Injectable} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocket: WebSocket;

  constructor() {
  }

  public openWebSocket() {
    const subject = webSocket('ws://localhost:8080/socket');

    subject.subscribe((r) => {
      console.log(r);
    });

    /* this.webSocket = new WebSocket('wss://localhost:8080/gs-guide-websocket');

     this.webSocket.onopen = (ev => {
       console.log('Open:', ev);
     });*/
  }
}
