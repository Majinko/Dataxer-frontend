import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PriceOfferComponent } from "./price-offer.component";
import { PriceOfferIndexComponent } from "./price-offer-index/price-offer-index.component";
import { PriceOfferRoutingModule } from "./price-offer-routing.module";
import { PriceOfferCreateComponent } from "./price-offer-create/price-offer-create.component";
import { MaterialModule } from "../../../theme/modules/material.module";
import { PriceOfferTableComponent } from "./price-offer-index/price-offer-table/price-offer-table.component";
import { CoreModule } from "../../../core/core.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AvatarModule } from "ngx-avatar";
import { ContactModule } from "../contact/contact.module";
import { ThemeModule } from "../../../theme/theme.module";
import { DocumentPackComponent } from "./components/document-pack/document-pack.component";
import { PriceOfferEditComponent } from './price-offer-edit/price-offer-edit.component';
import { DocumentFilterComponent } from './components/document-filter/document-filter.component';

@NgModule({
  declarations: [
    PriceOfferComponent,
    PriceOfferIndexComponent,
    PriceOfferCreateComponent,
    PriceOfferTableComponent,
    DocumentPackComponent,
    PriceOfferEditComponent,
    DocumentFilterComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    PriceOfferRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    ContactModule,
    ThemeModule,
  ],
})
export class PriceOfferModule {}
