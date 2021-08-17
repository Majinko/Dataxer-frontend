import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../../../core/services/web-socket.service';
import {SocketServiceService} from '../../../core/services/socket-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(
    private webSocketService: WebSocketService,
    private socketServiceService: SocketServiceService
  ) { }

  ngOnInit(): void {
  }
}
