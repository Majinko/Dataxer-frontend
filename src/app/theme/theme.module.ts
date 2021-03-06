import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DrawerComponent} from './component/drawer/drawer.component';
import {ToolbarComponent} from './component/toolbar/toolbar.component';
import {MaterialModule} from './modules/material.module';
import {GodButtonComponent} from './component/god-button/god-button.component';
import {SearchBarComponent} from './component/toolbar/component/search-bar/search-bar.component';
import {AvatarComponent} from './component/avatar/avatar.component';
import {CoreModule} from '../core/core.module';
import {MessageComponent} from './component/message/message.component';
import {AvatarModule} from 'ngx-avatar';
import {MenuLogoComponent} from './component/toolbar/component/menu-logo/menu-logo.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ItemAutocompleteComponent} from './component/item-autocomplete/item-autocomplete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewContactSelectComponent} from './component/new-contact-select/new-contact-select.component';
import {PackAutocompleteComponent} from './component/pack-autocomplete/pack-autocomplete.component';
import {DocumentPackComponent} from './component/document-pack/document-pack.component';
import {SlovakiaDigitalAutocompleteComponent} from './component/slovakia-digital-autocomplete/slovakia-digital-autocomplete.component';
import {NewProjectSelectComponent} from './component/new-project-select/new-project-select.component';
import {NewCategorySelectComponent} from './component/new-category-select/new-category-select.component';
import {SpinnerButtonComponent} from './component/spinner-button/spinner-button.component';
import {ElementPaidStateComponent} from './component/element-paid-state/element-paid-state.component';
import {FileComponent} from './component/file/file.component';
import {NgxFilesizeModule} from 'ngx-filesize';
import {PaymentsComponent} from './component/payments/payments.component';
import {PaymentDialogComponent} from './component/payments/components/payment-dialog/payment-dialog.component';
import {PaymentDialogStoreComponent} from './component/payments/components/payment-dialog-store/payment-dialog-store.component';
import {DocumentRelationComponent} from './component/document-relation/document-relation.component';
import {DocumentRelationDialogComponent} from './component/document-relation/component/document-relation-dialog/document-relation-dialog.component';
import {MenuTabComponent} from './component/menu-tab/menu-tab.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {NestedCategoriesComponent} from './component/nested-categories/nested-categories.component';
import { GlobalFilterComponent } from './component/global-filter/global-filter.component';
import {TranslateModule} from '@ngx-translate/core';
import { DocumentEmailDialogComponent } from './component/document-email-dialog/document-email-dialog.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CoreModule,
        AvatarModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NgxFilesizeModule,
        NgxPermissionsModule,
        TranslateModule,
        AngularEditorModule,
    ],
  declarations: [
    DrawerComponent,
    ToolbarComponent,
    GodButtonComponent,
    SearchBarComponent,
    AvatarComponent,
    MessageComponent,
    MenuLogoComponent,
    ItemAutocompleteComponent,
    NewContactSelectComponent,
    PackAutocompleteComponent,
    DocumentPackComponent,
    SlovakiaDigitalAutocompleteComponent,
    NewProjectSelectComponent,
    NewCategorySelectComponent,
    SpinnerButtonComponent,
    ElementPaidStateComponent,
    FileComponent,
    PaymentsComponent,
    PaymentDialogComponent,
    PaymentDialogStoreComponent,
    DocumentRelationComponent,
    DocumentRelationDialogComponent,
    MenuTabComponent,
    NestedCategoriesComponent,
    GlobalFilterComponent,
    DocumentEmailDialogComponent,
    ConfirmDialogComponent
  ],
  exports: [
    DrawerComponent,
    ToolbarComponent,
    MessageComponent,
    ItemAutocompleteComponent,
    NewContactSelectComponent,
    PackAutocompleteComponent,
    DocumentPackComponent,
    SlovakiaDigitalAutocompleteComponent,
    NewProjectSelectComponent,
    NewCategorySelectComponent,
    SpinnerButtonComponent,
    ElementPaidStateComponent,
    FileComponent,
    PaymentsComponent,
    DocumentRelationComponent,
    MenuTabComponent,
    NestedCategoriesComponent,
    GlobalFilterComponent,
  ]
})
export class ThemeModule {
}
