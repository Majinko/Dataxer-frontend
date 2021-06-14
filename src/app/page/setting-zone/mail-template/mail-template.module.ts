import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MailTemplateComponent} from './mail-template.component';
import {RouterModule, Routes} from '@angular/router';
import {MailTemplateIndexComponent} from './mail-template-index/mail-template-index.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {EmailTemplateVariableComponent} from './mail-template-index/components/email-template-variable/email-template-variable.component';

const routes: Routes = [{
  path: '',
  component: MailTemplateComponent,
  children: [
    {
      path: '',
      component: MailTemplateIndexComponent
    }
  ]
}];

@NgModule({
  declarations: [
    MailTemplateIndexComponent,
    MailTemplateComponent,
    EmailTemplateVariableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    AngularEditorModule
  ]
})
export class MailTemplateModule {
}
