import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  durationInSeconds = 5;

  constructor(
    @Inject(MessageService) private readonly messageService: MessageService,
    @Inject(MatSnackBar) private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.messageService.appMessage.subscribe(message => {
      this.openSnackBar(message.toString());
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: this.durationInSeconds * 1000
    });
  }
}
