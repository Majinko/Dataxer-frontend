import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PaymentService} from '../../../core/services/payment.service';
import {MatDialog} from '@angular/material/dialog';
import {PaymentDialogComponent} from './components/payment-dialog/payment-dialog.component';
import {PaymentDialogStoreComponent} from './components/payment-dialog-store/payment-dialog-store.component';
import {Payment} from '../../../core/models/payment';
import {MessageService} from '../../../core/services/message.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent<T> implements OnInit, OnDestroy {
  @Input() model: any;
  @Input() documentId: number;
  @Input() documentType: string;
  @Input() isPay: boolean;
  @Input() dueAtDays: number;

  @Output() canCreateTaxDocument = new EventEmitter<boolean>();

  payments: Payment[] = [];
  myEventSubscription: any;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getPayments();
    this.watchStorePayment();
  }

  getPayments() {
    return this.paymentService.getDocumentPayments(this.documentId, this.documentType).subscribe(payments => {
      this.payments = payments;

      this.canCreateTaxDoc();
    });
  }

  watchStorePayment() {
    this.dialog.closeAll();

    this.myEventSubscription = this.paymentService.newPayment.subscribe(payment => {
      if (payment.documentType === 'PROFORMA') {
        this.dialog.open(PaymentDialogStoreComponent, {
          width: '100%',
          maxWidth: '500px',
          autoFocus: false,
          data: {
            id: payment.documentId,
          }
        });
      }

      this.payments.push(payment);
      this.canCreateTaxDoc();
    });
  }

  showPaymentDialog() {
    this.dialog.open(PaymentDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      autoFocus: false,
      data: {
        documentId: this.documentId,
        documentType: this.documentType
      }
    });
  }

  destroy(id: number) {
    this.paymentService.destroy(id).subscribe(() => {
      this.payments = this.payments.filter(payment => payment.id !== id);
      this.paymentService.destroyPayment.next(true);
      this.messageService.add('Platba bola vymazaná');

      this.canCreateTaxDoc();
    });
  }

  canCreateTaxDoc() {
    this.canCreateTaxDocument.emit(this.payments.length > 0);
  }

  ngOnDestroy(): void {
    this.myEventSubscription.unsubscribe();
  }
}
