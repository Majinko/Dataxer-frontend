import { Injectable } from '@angular/core';
import {ResourceService} from '../class/ResourceService';
import {ItemInProjectDTO, ItemPrice} from '../models/item';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../models/serializers/Serializer';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemPriceService extends ResourceService<ItemPrice>{
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'itemPrice',
      new Serializer());
  }

  storeUpdate(itemPrice: ItemPrice): Observable<ItemPrice> {
    return this.httpClient
      .post<ItemPrice>(`${environment.baseUrl}/${this.endpoint}/store`, itemPrice);
  }

  setDefaultSupplier(id: number, itemId: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/${this.endpoint}/setDefaultSupplier/${id}/${itemId}`);
  }

  setBan(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/${this.endpoint}/setBan/${id}`);
  }

  delete(itemPriceId: number): Observable<void> {
    return this.httpClient.get<void>(`${environment.baseUrl}/itemPrice/delete/${itemPriceId}`);
  }
}
