import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../core/services/message.service';
import {ProfileService} from '../../../../core/services/profile.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: null,
      title: ['', Validators.required],
      logoUrl: null
    });

    if (this.data && this.data.profile) {
      this.formGroup.patchValue(this.data.profile);
    }
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.profileService.storeOrUpdate(this.formGroup.value).subscribe(r => {
      this.dialogRef.close();
      this.profileService.reloadProfile.next(true);

      this.messageService.add(this.f.id === null ? 'Profil bol pridaný.' : 'Profil bol aktualizovaný');
    });
  }

  objectComparisonFunction(option, value): boolean {
    return option.id === value.id;
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

}
