import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanySetting} from '../../../../core/models/companySetting';

@Component({
  selector: 'app-time-setting',
  templateUrl: './time-setting.component.html',
  styleUrls: ['./time-setting.component.scss']
})
export class TimeSettingComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      dayBeforeCanStore: 30,
      dayBeforeCanUpdate: 30,
      dayBeforeSendEmail: 1,
      email: [null, [Validators.required, Validators.email]],
      timeStepInMinutes: 5
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    const companySetting = new CompanySetting();

    companySetting.id = this.f.id.value;
    companySetting.companySettingType = 'TIME';
    companySetting.data = this.formGroup.value;


  }


  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
