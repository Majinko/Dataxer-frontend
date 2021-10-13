import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Demand} from '../models/demand';
import {ResourceService} from '../class/ResourceService';
import {DemandSerializer} from '../models/serializers/demandSerializer';

@Injectable({
  providedIn: 'root'
})
export class DemandService extends ResourceService<Demand> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'demand',
      new DemandSerializer());
  }
}
