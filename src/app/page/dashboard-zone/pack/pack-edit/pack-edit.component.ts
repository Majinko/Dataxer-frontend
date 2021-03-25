import {Component, OnInit} from '@angular/core';
import {Pack} from '../../../../core/models/pack';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../core/services/message.service';
import {ActivatedRoute} from '@angular/router';
import {PackService} from '../../../../core/services/pack.service';

@Component({
  selector: 'app-pack-edit',
  templateUrl: './pack-edit.component.html',
  styleUrls: ['./pack-edit.component.scss']
})

export class PackEditComponent implements OnInit {
  pack: Pack;
  formGroup: FormGroup;

  constructor(
    private messageService: MessageService,
    private packService: PackService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      packItems: this.formBuilder.array([])
    });

    this.getById();
  }

  getById() {
    this.packService.getById(+this.route.snapshot.paramMap.get('pack_id')).subscribe(p => {
      this.pack = p;

      this.formGroup.patchValue(p);
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.packService.update(this.formGroup.value).subscribe(() => {
      this.messageService.add('Sada položiek bola aktualizovaná.');
    });
  }
}
