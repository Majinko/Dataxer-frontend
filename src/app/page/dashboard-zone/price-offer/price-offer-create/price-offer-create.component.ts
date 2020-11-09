import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PriceOfferService} from "src/app/core/services/priceOffer.service";
import {MessageService} from "src/app/core/services/message.service";
import {Router} from "@angular/router";
import {DocumentHelper} from "../../../../core/class/DocumentHelper";
import {UserService} from "../../../../core/services/user.service";
import {NumberingService} from "../../../../core/services/numbering.service";
import {CompanyService} from "../../../../core/services/company.service";

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
    private userService: UserService,
    private priceOfferService: PriceOfferService,
    private messageService: MessageService,
    private numberingService: NumberingService,
    private companyService: CompanyService,
    private router: Router,
    public documentHelper: DocumentHelper
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.preparePriceOfferData();
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contact: [null],
      title: ["", Validators.required],
      subject: "",
      number: ["", Validators.required],
      state: null,
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [new Date()],
      note: "",
      noteToRecipient: "",
      discount: 0,
      price: 0,
      totalPrice: 0,
      documentData: this.formBuilder.group({
        user: this.formBuilder.group({
          displayName: "",
          phone: "",
          email: "",
        }),
        firm: this.companyService.company
      }),

      packs: this.formBuilder.array([])
    });
  }

  // set user
  private preparePriceOfferData() {
    this.formGroup.get("documentData.user").patchValue(this.userService.user);


    this.numberingService.nextNumber('PRICE_OFFER').subscribe(r => {
      this.formGroup.patchValue({number: r})
    })
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
