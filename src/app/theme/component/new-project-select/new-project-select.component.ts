import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Project} from '../../../core/models/project';
import {ProjectService} from '../../../core/services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectCreateComponent} from '../../../page/dashboard-zone/project/project-create/project-create.component';
import {Contact} from '../../../core/models/contact';
import {DropdownPosition} from '@ng-select/ng-select/lib/ng-select.component';

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
export class NewProjectSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  project: Project;
  allProjects: Project[] = [];
  selectedClients: Contact[] = [];

  @Input() client: Contact = null;
  @Input() projects: Project[] = [];
  @Input() showAddButton: boolean = true;
  @Input() dropDownPosition: DropdownPosition = 'auto';

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService
  ) {
  }

  onTouched = () => {
  }
  onChange = _ => {
  }

  ngOnInit(): void {
    console.log(this.projects);
    if (this.projects.length === 0) {
      this.getProjects();
    }

    this.projectService.projectStore.subscribe(project => {
      this.onChange(project);
      this.project = project;

      this.projects = this.projects.concat(project);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.client && changes.client.currentValue != null && changes.client.firstChange === false) {
      this.getClientProjects(changes.client.currentValue);
    }
  }

  private getClientProjects(client: Contact) {
    this.projectService.allByClient(client.id).subscribe((projects) => {
      const p = this.allProjects;

      projects.map((project) => {
        project.group = client.name;
      });

      this.projects = [];
      this.projects = [...projects, ...p];

      this.selectedClients.push(client);
    });
  }

  private getProjects() {
    this.projectService.all().subscribe((projects) => {
      this.projects = projects.map(project => {
        project.group = 'Všetky zákazky';

        return project;
      });

      this.allProjects = this.projects;
    });
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
    if (project) {
      project.fullTitle = ((project.number ?? '') + ' ' + project.title).trim();
    }

    this.project = project;
  }

  selectProject(project: Project) {
    this.onChange(project);
  }
}
