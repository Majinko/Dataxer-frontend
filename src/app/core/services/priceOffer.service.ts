import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PriceOffer} from '../models/priceOffer';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Paginate} from '../models/paginate';
import {DocumentFilter} from '../filter/document-filter';
import {prepareFilter} from '../../../helper';

@Injectable({
  providedIn: 'root',
})
export class PriceOfferService {
  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<PriceOffer> {
    return this.http.get<PriceOffer>(`${environment.baseUrl}/price-offer/${id}`);
  }

  store(priceOffer: PriceOffer): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/price-offer/store`, priceOffer);
  }

  paginate(page: number, size: number, documentFilter: DocumentFilter): Observable<Paginate<PriceOffer>> {
    const params = prepareFilter(documentFilter);

    return this.http.get<Paginate<PriceOffer>>(`${environment.baseUrl}/price-offer/paginate?page=${page}&size=${size}`, {params});
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/price-offer/destroy/${id}`);
  }

  update(priceOffer: PriceOffer): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/price-offer/update`, priceOffer);
  }
}
