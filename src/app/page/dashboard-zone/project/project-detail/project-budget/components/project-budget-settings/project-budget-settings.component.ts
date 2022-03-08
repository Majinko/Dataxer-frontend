import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../../../../core/class/DocumentHelper';
import {Pack} from '../../../../../../../core/models/pack';
import {Contact} from '../../../../../../../core/models/contact';
import {ContactCreateComponent} from '../../../../../contact/contact-create/contact-create.component';
import {ContactService} from '../../../../../../../core/services/contact.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-project-budget-settings',
  templateUrl: './project-budget-settings.component.html',
  styleUrls: ['./project-budget-settings.component.scss'],
  providers: [
    DocumentHelper
  ],
})
export class ProjectBudgetSettingsComponent implements OnInit {
  formGroup: FormGroup;
  budgetItems: Pack[] = [];
  contact: any;
  contacts: Contact[] = [];
  acceptedDemand = [
    {
      title: 'dataid',
      priceOffer: [
        {
          id: 1,
          title: 'CP 01 - 2020',
          priceOfferId: 2603,
          date: '1.2.2021',
          state: 'approved',
        },
        {
          id: 2,
          title: 'CP 02 - 2020',
          priceOfferId: 2603,
          date: '1.2.2021',
          state: 'waiting',
        },
        {
          id: 3,
          title: 'CP 03 - 2020',
          priceOfferId: 2603,
          date: '1.2.2021',
          state: 'rejected',
        }
      ]
    },
    {
      title: 'hmmCompany',
      priceOffer: [
        {
          id: 1,
          title: 'CP 01 - 2020',
          priceOfferId: 2603,
          date: '1.2.2021',
          state: 'rejected',
        },
        {
          id: 2,
          title: 'CP 02 - 2020',
          priceOfferId: 2603,
          date: '1.2.2021',
          state: 'rejected',
        },
        {
          id: 3,
          title: 'CP 03 - 2020',
          priceOfferId: 2603,
          date: '1.2.2021',
          state: 'waiting',
        }
      ]
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public documentHelper: DocumentHelper,
    public dialogRef: MatDialogRef<ProjectBudgetSettingsComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.prepareForm();
    this.budgetItems = this.data.budgetItems;
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contacts: [null, Validators.required],
    });
    if (this.data.item) {
      this.formGroup.patchValue({
        contacts: this.data.item.contacts
      });
    }
  }

  save() {
    console.log(this.budgetItems);
  }
}
