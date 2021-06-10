import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PriceOffer} from '../models/priceOffer';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Paginate} from '../models/paginate';
import {DocumentFilter} from '../models/filters/document-filter';
import {prepareStringFilter} from '../../../helper';
import {IPaginate} from '../interface/IPaginate';

@Injectable({
  providedIn: 'root',
})
export class PriceOfferService implements IPaginate<PriceOffer> {
  filter: DocumentFilter;

  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<PriceOffer> {
    return this.http.get<PriceOffer>(`${environment.baseUrl}/price-offer/${id}`);
  }

  store(priceOffer: PriceOffer): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/price-offer/store`, priceOffer);
  }

  paginate(page: number, size: number): Observable<Paginate<PriceOffer>> {
    const filter = prepareStringFilter('priceOffer', this.filter);

    return this.http.get<Paginate<PriceOffer>>(`${environment.baseUrl}/price-offer/paginate?page=${page}&size=${size}${filter !== '' ? '&filters=' + filter : ''}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/price-offer/destroy/${id}`);
  }

  update(priceOffer: PriceOffer): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/price-offer/update`, priceOffer);
  }

  findAllByProject(projectId: number): Observable<PriceOffer[]> {
    return this.http.get<PriceOffer[]>(`${environment.baseUrl}/price-offer/project/${projectId}`);
  }
}
