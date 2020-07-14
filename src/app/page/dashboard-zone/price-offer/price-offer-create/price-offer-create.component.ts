import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/core/services/auth.service";
import {PriceOfferService} from "src/app/core/services/priceOffer.service";
import {MessageService} from "src/app/core/services/message.service";
import {Router} from "@angular/router";
import {DocumentHelper} from "../../../../core/class/DocumentHelper";

@Component({
  selector: "app-create",
  templateUrl: "./price-offer-create.component.html",
  styleUrls: ["./price-offer-create.component.scss"],
  providers: [DocumentHelper]
})
export class PriceOfferCreateComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private priceOfferService: PriceOfferService,
    private messageService: MessageService,
    private router: Router,
    public documentHelper: DocumentHelper
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.getUser();
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contact: [null],
      title: ["", Validators.required],
      subject: "",
      number: ["", Validators.required],
      state: "pending",
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
  }

  // get user
  private getUser() {
    this.authService.loggedUser().subscribe((u) => {
      this.formGroup.get("priceOfferData.user").patchValue(u);
    });
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

    this.priceOfferService.store(this.formGroup.value).subscribe((r) => {
      this.router
        .navigate(["/price-offer"])
        .then(() => this.messageService.add("Cenova ponuka bola ulozna"));
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
