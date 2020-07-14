import {Component, OnInit} from '@angular/core';
import {PriceOffer} from "../../../../core/models/priceOffer";
import {ActivatedRoute} from "@angular/router";
import {PriceOfferService} from "../../../../core/services/priceOffer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DocumentHelper} from "../../../../core/class/DocumentHelper";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-price-offer-edit',
  templateUrl: './price-offer-edit.component.html',
  styleUrls: ['./price-offer-edit.component.scss'],
  providers: [DocumentHelper]
})
export class PriceOfferEditComponent implements OnInit {
  priceOffer: PriceOffer;
  formGroup: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private priceOfferService: PriceOfferService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public documentHelper: DocumentHelper
  ) {
  }

  ngOnInit() {
    this.getById();
  }

  getById() {
    this.priceOfferService.getById(+this.route.snapshot.paramMap.get('price_offer_id')).subscribe(p => {
      this.priceOffer = p;

      this.prepareForm();
    })
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: '',
      contact: [null],
      title: ["", Validators.required],
      subject: "",
      number: ["", Validators.required],
      state: "",
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [new Date()],
      note: "",
      noteToRecipient: "",
      discount: 0,
      price: 0,
      totalPrice: 0,
      priceOfferData: this.formBuilder.group({
        user: this.formBuilder.group({
          displayName: "",
          phone: "",
          email: "",
        }),
      }),

      packs: this.formBuilder.array([])
    });

    this.formGroup.patchValue(this.priceOffer);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  // submit form
  submit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    //set offer price and total price
    this.formGroup.patchValue({
      price: this.documentHelper.price,
      totalPrice: this.documentHelper.totalPrice,
    })

    this.priceOfferService.update(this.formGroup.value).subscribe((r) => {
      this.messageService.add("Cenová ponuka bola uložená")
    });
  }
}
