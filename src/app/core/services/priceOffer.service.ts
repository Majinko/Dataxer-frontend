import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PriceOffer} from '../models/priceOffer';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';
import {Paginate} from '../models/paginate';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PriceOfferService extends ResourceService<PriceOffer> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'priceOffer',
      new Serializer());
  }

  paginate(page: number, size: number): Observable<Paginate<PriceOffer>> {
    return this.httpClient
      .get<Paginate<PriceOffer>>(`${environment.baseUrl}/${'priceOffer'}/paginate?page=${page}&size=${size}${this.rsqlFilter ? '&filters=' + this.rsqlFilter : ''}`)
      .pipe(map((priceOffers => {
        priceOffers.content = priceOffers.content.sort((a, b) => +b.number - +a.number);

        return priceOffers;
      })));
  }

  storeFromBudget(priceOffer: PriceOffer, projectId: number = null): Observable<PriceOffer> {
    return this.httpClient.post<PriceOffer>(`${environment.baseUrl}/priceOffer/storeFromBudget/${projectId}`, priceOffer);
  }

  findAllByProject(projectId: number, companyIds: number[] = null): Observable<PriceOffer[]> {
    return this.httpClient.get<PriceOffer[]>(`${environment.baseUrl}/priceOffer/project/${projectId}${companyIds && companyIds.length > 0 ? '?companyIds=' + companyIds : ''}`);
  }

  duplicate(oldId: number): Observable<PriceOffer> {
    return this.httpClient.get<PriceOffer>(`${environment.baseUrl}/priceOffer/duplicate/${oldId}`);
  }

  createFromDemand(demandId: number, priceOffer: PriceOffer): Observable<PriceOffer> {
    return this.httpClient.post<PriceOffer>(`${environment.baseUrl}/priceOffer/createFromDemand/${demandId}`, priceOffer);
  }
}
