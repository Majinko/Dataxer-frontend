import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from '../models/item';
import {environment} from '../../../environments/environment';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends ResourceService<Item> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'item',
      new Serializer());
  }

  search(q: string): Observable<Item[]> {
    if (!q.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.httpClient.get<Item[]>(`${environment.baseUrl}/item/search/${q}`);
  }
}
