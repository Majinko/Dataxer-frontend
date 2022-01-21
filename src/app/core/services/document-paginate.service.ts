import { Injectable } from '@angular/core';
import {ResourceService} from '../class/ResourceService';
import {DocumentBase} from '../models/documentBase';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../models/serializers/Serializer';

@Injectable({
  providedIn: 'root'
})
export class DocumentPaginateService extends ResourceService<DocumentBase>{
  lastFilterModel: string;

  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'invoice',
      new Serializer());
  }
}
