import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PackService} from "../../../../core/services/pack.service";
import {MessageService} from "../../../../core/services/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-set-item-create',
  templateUrl: './pack-create.component.html',
  styleUrls: ['./pack-create.component.scss']
})
export class PackCreateComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private packService: PackService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      items: this.formBuilder.array([])
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.packService.store(this.formGroup.value).subscribe(() => {
      this.router.navigate(['/pack']).then(() => {
        this.messageService.add("Pack item was store")
      })
    })
  }
}
