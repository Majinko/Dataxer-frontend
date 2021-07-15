import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PriceOffer} from '../models/priceOffer';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ResourceService} from '../class/ResourceService';
import {PriceOfferSerializer} from '../models/serializers/priceOfferSerializer';

@Injectable({
  providedIn: 'root',
})
export class PriceOfferService extends ResourceService<PriceOffer> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'priceOffer',
      new PriceOfferSerializer());
  }

  findAllByProject(projectId: number): Observable<PriceOffer[]> {
    return this.httpClient.get<PriceOffer[]>(`${environment.baseUrl}/priceOffer/project/${projectId}`);
  }
}
