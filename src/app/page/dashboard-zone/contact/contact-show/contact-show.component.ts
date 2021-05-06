import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactService} from '../../../../core/services/contact.service';
import {Contact} from '../../../../core/models/contact';

@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html',
  styleUrls: ['./contact-show.component.scss']
})
export class ContactShowComponent implements OnInit {
  contact: Contact;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.contactService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(contact => {
      this.contact = contact;
    });
  }
}
