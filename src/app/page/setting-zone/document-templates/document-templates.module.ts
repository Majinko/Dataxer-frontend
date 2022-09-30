import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTemplatesComponent } from './document-templates.component';
import { DocumentTemplatesIndexComponent } from './document-templates-index/document-templates-index.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {
  NoteTemplatesCreateDialogComponent
} from '../../../theme/component/note-templates/components/note-templates-create-dialog/note-templates-create-dialog.component';

const routes: Routes = [{
  path: '',
  component: DocumentTemplatesComponent,
  children: [
    {
      path: '',
      component: DocumentTemplatesIndexComponent
    },
    {
      path: 'create',
      component: NoteTemplatesCreateDialogComponent
    }
  ]
}];

@NgModule({
  declarations: [
    DocumentTemplatesComponent,
    DocumentTemplatesIndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class DocumentTemplatesModule { }
