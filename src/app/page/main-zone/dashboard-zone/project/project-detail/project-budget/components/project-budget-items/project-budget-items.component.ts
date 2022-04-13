import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DocumentHelper} from '../../../../../../../../core/class/DocumentHelper';
import {Pack} from '../../../../../../../../core/models/pack';

@Component({
  selector: 'app-project-budget-items',
  templateUrl: './project-budget-items.component.html',
  styleUrls: ['./project-budget-items.component.scss'],
  providers: [
    DocumentHelper
  ],
})
export class ProjectBudgetItemsComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  packs: Pack[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public documentHelper: DocumentHelper,
    public dialogRef: MatDialogRef<ProjectBudgetItemsComponent>,
  ) { }

  ngOnInit(): void {
    this.prepareForm();
    console.log(this.data);
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      packs: this.formBuilder.array([])
    });
    if (this.data && this.data.budgetItems.length > 0) {
      console.log('packs');

      this.packs = this.data.budgetItems;
      console.log(this.packs);
    }
  }


  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }
}
