import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DocumentHelper} from '../../../../../../../../core/class/DocumentHelper';
import {Pack} from '../../../../../../../../core/models/pack';
import {Project} from "../../../../../../../../core/models/project";

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
  projects: Project[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public documentHelper: DocumentHelper,
    public dialogRef: MatDialogRef<ProjectBudgetItemsComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this.data?.project) {
      this.projects.push(this.data.project);
    }
    this.prepareForm();
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      project: this.data.project,
      packs: this.formBuilder.array([])
    });
  }


  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }
}
