import {Component, Inject, OnInit} from '@angular/core';
import {ContactService} from '../../../../core/services/contact.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../../../../core/models/contact';
import {UploadService} from '../../../../core/services/upload.service';
import {SlovakiaDigital} from "../../../../core/models/slovakiaDigital";
import {MessageService} from "../../../../core/services/message.service";
import {COUNTRIES} from "../../../../core/data/countries";

@Component({
  selector: 'app-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  url = null;
  contact: Contact;
  contactForm: FormGroup;
  countries = COUNTRIES;

  constructor(
    @Inject(ContactService) private readonly contactService: ContactService,
    @Inject(UploadService) private readonly uploadService: UploadService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.getContact();

    this.contactForm = this.formBuilder.group({
      id: ['', Validators.required],
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

  getContact() {
    return this.contactService.getById(+this.route.snapshot.paramMap.get('contact_id')).subscribe(contact => {
      this.contact = contact;

      this.contactForm.patchValue(contact);
    });
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

  onSubmit(contactFormData: Contact) {
    if (this.contactForm.invalid) {
      return;
    }

    this.contactService.update(contactFormData).subscribe(() => {
      this.messageService.add("Kontakt bol aktualizovaný");
    });
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
