import {Injectable} from '@angular/core';
import {ResourceService} from '../class/ResourceService';
import {Photo} from '../models/photo';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../models/serializers/Serializer';
import {IPhotoservice} from '../interface/IPhotoservice';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends ResourceService<Photo> implements IPhotoservice {
  modelType: string;

  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'photo',
      new Serializer());
  }

  storeAll(photos: Photo[]): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/photo/store`, photos);
  }
}
