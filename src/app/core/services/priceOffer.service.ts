import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PriceOffer} from '../models/priceOffer';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';

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

  findAllByProject(projectId: number, companyIds: number[] = null): Observable<PriceOffer[]> {
    return this.httpClient.get<PriceOffer[]>(`${environment.baseUrl}/priceOffer/project/${projectId}${companyIds && companyIds.length > 0 ? '?companyIds=' + companyIds : ''}`);
  }

  duplicate(oldId: number): Observable<PriceOffer>{
    return this.httpClient.get<PriceOffer>(`${environment.baseUrl}/priceOffer/duplicate/${oldId}`);
  }
}
