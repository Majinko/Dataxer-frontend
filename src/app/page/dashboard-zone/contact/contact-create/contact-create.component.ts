import {Component, Inject, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../../../core/services/contact.service';
import {Contact} from '../../../../core/models/contact';
import {Router} from '@angular/router';
import {UploadService} from '../../../../core/services/upload.service';
import {MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent {
  contactForm: FormGroup;

  constructor(
    @Inject(ContactService) private readonly contactService: ContactService,
    @Inject(UploadService) private readonly uploadService: UploadService,
    private readonly messageService: MessageService,
    @Optional() public dialogRef: MatDialogRef<ContactCreateComponent>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.contactForm = this.formBuilder.group({
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

  onSubmit(contactFormData: Contact) {
    if (this.contactForm.invalid) {
      return;
    }

    this.contactService.store(this.contactForm.value).subscribe(data => {
        this.messageService.add("Kontakt bol ulozeny")

        if (this.dialogRef === null)
          this.router.navigate(['/app/contact']);
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
}
