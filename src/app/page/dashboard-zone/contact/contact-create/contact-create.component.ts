import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../../../core/services/contact.service';
import {Router} from '@angular/router';
import {UploadService} from '../../../../core/services/upload.service';
import {MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../../core/services/message.service";
import {SlovakiaDigital} from "../../../../core/models/slovakiaDigital";
import {COUNTRIES} from "../../../../core/data/countries";

@Component({
  selector: 'app-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {
  contactForm: FormGroup;
  countries = COUNTRIES;

  constructor(
    private readonly contactService: ContactService,
    private readonly uploadService: UploadService,
    private readonly messageService: MessageService,
    @Optional() public dialogRef: MatDialogRef<ContactCreateComponent>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      photoUrl: '',
      street: '',
      city: '',
      country: '',
      postalCode: '',
      regNumber: '',
      email: '',
      phone: '',
      cin: '',
      tin: '',
      vatin: ''
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.contactService.store(this.contactForm.value).subscribe(data => {
        this.messageService.add("Kontakt bol uložený")

        if (this.dialogRef === null)
          this.router.navigate(['/contact']);
      }
    );
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.uploadService.pushUpload('contact/', event.target.files[0]).then(ref => {
        ref.ref.getDownloadURL().then((url) => {
          this.contactForm.patchValue({
            photoUrl: url
          });
        });
      });
    }
  }


  setFirmData(firm: SlovakiaDigital) {
    this.contactForm.patchValue({
      name: firm.name,
      street: firm.street,
      city: firm.municipality,
      postalCode: firm.postal_code,
      regNumber: firm.street,
      cin: firm.cin,
      tin: firm.tin,
      vatin: firm.vatin
    })
  }
}
