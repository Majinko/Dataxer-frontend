import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Pack} from '../models/pack';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';

@Injectable({
  providedIn: 'root'
})
export class PackService extends ResourceService<Pack> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'pack',
      new Serializer());
  }

  search(q: string): Observable<Pack[]> {
    if (!q.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.httpClient.get<Pack[]>(`${environment.baseUrl}/pack/search?q=${q}`);
  }
}
