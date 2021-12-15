import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Project} from '../../../core/models/project';
import {ProjectService} from '../../../core/services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectCreateComponent} from '../../../page/dashboard-zone/project/project-create/project-create.component';

@Component({
  selector: 'app-new-project-select',
  templateUrl: './new-project-select.component.html',
  styleUrls: ['./new-project-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NewProjectSelectComponent),
    multi: true
  }]
})
export class NewProjectSelectComponent implements ControlValueAccessor, OnInit {
  project: Project;
  projects: Project[] = [];

  @Input() showAddButton: boolean = true;

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService
  ) {
  }

  onTouched = () => {
  };
  onChange = _ => {
  };

  ngOnInit(): void {
    this.getProjects();

    this.projectService.projectStore.subscribe(project => {
      this.onChange(project);
      this.project = project;

      this.projects = this.projects.concat(project);
    });
  }

  private getProjects() {
    this.projectService.all().subscribe(projects => this.projects = projects);
  }

  openDialog() {
    this.dialog.open(ProjectCreateComponent, {
      data: {inModal: true},
      autoFocus: false,
      maxHeight: '90vh'
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(project: Project) {
    this.project = project;
  }

  selectProject(project: Project) {
    this.onChange(project);
  }
}
