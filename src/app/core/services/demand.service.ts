import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Demand} from '../models/demand';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandService extends ResourceService<Demand> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'demand',
      new Serializer());
  }

  duplicate(oldId: number): Observable<Demand> {
    return this.httpClient.get<Demand>(`${environment.baseUrl}/demand/duplicate/${oldId}`);
  }
}
