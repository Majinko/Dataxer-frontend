import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../../../../core/class/DocumentHelper';
import {Pack} from '../../../../../../../core/models/pack';
import {Contact} from '../../../../../../../core/models/contact';
import {ContactCreateComponent} from '../../../../../contact/contact-create/contact-create.component';
import {ContactService} from '../../../../../../../core/services/contact.service';

@Component({
  selector: 'app-project-budget-settings',
  templateUrl: './project-budget-settings.component.html',
  styleUrls: ['./project-budget-settings.component.scss'],
  providers: [
    DocumentHelper
  ],
})
export class ProjectBudgetSettingsComponent implements OnInit {
  budgetItems: Pack[] = [];
  contact: Contact;
  contacts: Contact[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected router: Router,
    public dialog: MatDialog,
    private contactService: ContactService,
    public route: ActivatedRoute,
    public documentHelper: DocumentHelper,
    public dialogRef: MatDialogRef<ProjectBudgetSettingsComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.budgetItems = this.data.budgetItems;
    this.getContacts();

    this.contactService.contractorStore.subscribe(c => {
      this.contact = c;

      this.contacts = this.contacts.concat(c);
    });
  }

  getContacts() {
    this.contactService.all().subscribe(contact => this.contacts = contact);
  }

  selectContact($event: any, item: any, type: string) {
    if (type === 'pack') {
      item.packItems.forEach( f => {
        f.contacts = $event;
      });
    } else {
      console.log($event);
      console.log(item);
    }
  }
  openDialog() {
    this.dialog.open(ContactCreateComponent, {
      data: {inModal: true},
      autoFocus: false
    });
  }

  save() {
    console.log(this.budgetItems);
  }
}
