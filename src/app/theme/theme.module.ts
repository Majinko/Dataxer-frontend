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
import {
  SlovakiaDigitalAutocompleteComponent
} from './component/slovakia-digital-autocomplete/slovakia-digital-autocomplete.component';
import {NewProjectSelectComponent} from './component/new-project-select/new-project-select.component';
import {NewCategorySelectComponent} from './component/new-category-select/new-category-select.component';
import {SpinnerButtonComponent} from './component/spinner-button/spinner-button.component';
import {ElementPaidStateComponent} from './component/element-paid-state/element-paid-state.component';
import {FileComponent} from './component/file/file.component';
import {NgxFilesizeModule} from 'ngx-filesize';
import {PaymentsComponent} from './component/payments/payments.component';
import {PaymentDialogComponent} from './component/payments/components/payment-dialog/payment-dialog.component';
import {
  PaymentDialogStoreComponent
} from './component/payments/components/payment-dialog-store/payment-dialog-store.component';
import {DocumentRelationComponent} from './component/document-relation/document-relation.component';
import {
  DocumentRelationDialogComponent
} from './component/document-relation/component/document-relation-dialog/document-relation-dialog.component';
import {MenuTabComponent} from './component/menu-tab/menu-tab.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {NestedCategoriesComponent} from './component/nested-categories/nested-categories.component';
import {TranslateModule} from '@ngx-translate/core';
import {DocumentEmailDialogComponent} from './component/document-email-dialog/document-email-dialog.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {ConfirmDialogComponent} from './component/confirm-dialog/confirm-dialog.component';
import {PhotoUploaderComponent} from './component/photo-uploader/photo-uploader.component';
import {CategorySelectGroupComponent} from './component/category-select-group/category-select-group.component';
import {DateRangeDialogComponent} from './component/date-range-dialog/date-range-dialog.component';
import {CategoryTreeControlComponent} from './component/category-tree-control/category-tree-control.component';
import {DndDirective} from '../core/directives/dnd.directive';
import {UploadFilesComponent} from './component/upload-files/upload-files.component';
import {DocumentDestroyButtonComponent} from './component/document-destroy-button/document-destroy-button.component';
import {CompanySelectGroupComponent} from './component/company-select-group/company-select-group.component';
import {DemandPackComponent} from './component/demand-pack/demand-pack.component';
import {DemandDocumentPackComponent} from './component/demand-document-pack/demand-document-pack.component';
import {
  CategoryTreeSharedCategoriesComponent
} from './component/category-tree-control/components/category-tree-shared-categories/category-tree-shared-categories.component';
import {NewUserSelectComponent} from './component/new-user-select/new-user-select.component';
import {BackButtonComponent} from './component/back-button/back-button.component';
import {MultiplePhotoUploaderComponent} from './component/multiple-photo-uploader/multiple-photo-uploader.component';
import {
  ItemSupplierPricesDialogComponent
} from './component/item-supplier-prices-dialog/item-supplier-prices-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ItemPriceComponent} from './component/item-supplier-prices-dialog/components/item-price/item-price.component';
import {
  ItemPricesTableComponent
} from './component/item-supplier-prices-dialog/components/item-prices-table/item-prices-table.component';
import {NoteTemplatesComponent} from './component/note-templates/note-templates.component';
import {
  NoteTemplatesCreateDialogComponent
} from './component/note-templates/components/note-templates-create-dialog/note-templates-create-dialog.component';
import {
  NoteTemplatesDialogComponent
} from './component/note-templates/components/note-templates-dialog/note-templates-dialog.component';
import {
  DocumentPackTitleDialogComponent
} from './component/document-pack/components/document-pack-title-dialog/document-pack-title-dialog.component';
import { ChangeStateDialogComponent } from './component/change-state-dialog/change-state-dialog.component';
import { ItemPricePeriodComponent } from './component/item-supplier-prices-dialog/components/item-price-period/item-price-period.component';

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
    MatSlideToggleModule,
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
    DndDirective,
    PaymentsComponent,
    PaymentDialogComponent,
    PaymentDialogStoreComponent,
    DocumentRelationComponent,
    DocumentRelationDialogComponent,
    MenuTabComponent,
    NestedCategoriesComponent,
    DocumentEmailDialogComponent,
    ConfirmDialogComponent,
    PhotoUploaderComponent,
    CategorySelectGroupComponent,
    DateRangeDialogComponent,
    CategoryTreeControlComponent,
    UploadFilesComponent,
    DocumentDestroyButtonComponent,
    CompanySelectGroupComponent,
    DemandPackComponent,
    DemandDocumentPackComponent,
    CategoryTreeSharedCategoriesComponent,
    NewUserSelectComponent,
    BackButtonComponent,
    MultiplePhotoUploaderComponent,
    ItemSupplierPricesDialogComponent,
    ItemPriceComponent,
    ItemPricesTableComponent,
    NoteTemplatesComponent,
    NoteTemplatesCreateDialogComponent,
    NoteTemplatesDialogComponent,
    DocumentPackTitleDialogComponent,
    ChangeStateDialogComponent,
    ItemPricePeriodComponent,
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
    DndDirective,
    PaymentsComponent,
    DocumentRelationComponent,
    MenuTabComponent,
    NestedCategoriesComponent,
    PhotoUploaderComponent,
    CategorySelectGroupComponent,
    CategoryTreeControlComponent,
    UploadFilesComponent,
    DocumentDestroyButtonComponent,
    CompanySelectGroupComponent,
    DemandPackComponent,
    DemandDocumentPackComponent,
    NewUserSelectComponent,
    BackButtonComponent,
    MultiplePhotoUploaderComponent,
    ItemPriceComponent,
    ItemPricesTableComponent,
    NoteTemplatesComponent,
  ]
})
export class ThemeModule {
}
