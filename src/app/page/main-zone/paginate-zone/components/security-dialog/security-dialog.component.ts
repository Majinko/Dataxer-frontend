import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-security-dialog',
  templateUrl: './security-dialog.component.html',
  styleUrls: ['./security-dialog.component.scss']
})
export class SecurityDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SecurityDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      code: null
    });
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }
}
