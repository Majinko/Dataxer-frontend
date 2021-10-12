import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Demand} from '../models/demand';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Paginate} from '../models/paginate';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';

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
}
