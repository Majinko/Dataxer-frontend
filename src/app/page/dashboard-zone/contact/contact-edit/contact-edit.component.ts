import {Component, Inject, OnInit} from '@angular/core';
import {ContactService} from '../../../../core/services/contact.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../../../../core/models/contact';
import {UploadService} from '../../../../core/services/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  url = null;
  contact: Contact;
  contactForm: FormGroup;

  constructor(
    @Inject(ContactService) private readonly contactService: ContactService,
    @Inject(UploadService) private readonly uploadService: UploadService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.getContact();

    this.contactForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      photoUrl: '',
      street: '',
      city: '',
      country: '',
      postalCode: '',
      regNumber: '',
      email: '',
      phone: ''
    });
  }

  getContact() {
    return this.contactService.getById(+this.route.snapshot.paramMap.get('contact_id')).subscribe(contact => {
      this.contact = contact;

      this.contactForm.setValue(contact);
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

    this.contactService.update(contactFormData, this.contact.id).subscribe(
      data => this.router.navigate(['/app/contact'])
    );
  }
}
