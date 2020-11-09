import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CostType} from "../../../../core/models/cost";
import {COSTSTATES, COSTTYPES} from "../../../../core/data/costs";

@Component({
  selector: 'app-cost-create',
  templateUrl: './cost-create.component.html',
  styleUrls: ['./cost-create.component.scss']
})
export class CostCreateComponent implements OnInit {
  formGroup: FormGroup;

  costTypes = COSTTYPES;
  costStates = COSTSTATES;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.prepareForm()
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      costType: null,
      state: null,
      paymentMethod: null,
      isInternal: false,
      isRepeated: false,
      period: null,
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
  }
}
