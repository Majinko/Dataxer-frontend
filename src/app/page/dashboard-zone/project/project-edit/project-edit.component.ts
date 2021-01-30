import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../core/services/project.service';
import {MessageService} from '../../../../core/services/message.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Project} from '../../../../core/models/project';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../helper';
import {AddPercentPipe} from '../../../../core/pipes/add-percent.pipe';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    AddPercentPipe
  ],
})
export class ProjectEditComponent implements OnInit {
  formGroup: FormGroup;
  project: Project;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.projectService.getById(+this.route.snapshot.paramMap.get('project_id')).subscribe((p) => {
      this.project = p;

      this.formGroup = this.formBuilder.group({
        id: p.id,
        title: [p.title, Validators.required],
        number: p.number,
        description: p.description,
        contact: p.contact,
        state: p.state,
        address: p.address,
        area: p.area,
        startedAt: p.startedAt,
        finishedAt: p.finishedAt,
      });
    });
  }

  submit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.projectService.update(this.formGroup.value).subscribe(() => {
      this.messageService.add('Zákazka bola aktualizovana');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
