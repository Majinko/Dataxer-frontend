import {Injectable} from '@angular/core';
import {StompConfig, StompRService} from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  constructor(private stompService: StompRService) {
  }

  public init(): void {
    if (!this.stompService.connected()) {
      this.stompService.config = this.stompConfig();

      this.stompService.initAndConnect();
    }
  }

  private stompConfig(): StompConfig {
    const provider = () => {
      return new SockJS('/api/socket');
    };

    const config = new StompConfig();
    config.url = provider;
    config.heartbeat_in = 0;
    config.heartbeat_out = 0;
    config.reconnect_delay = 10000;

    return config;
  }
}
