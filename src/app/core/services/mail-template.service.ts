import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceService} from '../class/ResourceService';
import {MailTemplate} from '../models/mailTemplate';
import {MailTemplateSerializer} from '../models/serializers/mailTemplateSerializer';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailTemplateService extends ResourceService<MailTemplate> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'mailTemplates',
      new MailTemplateSerializer());
  }

  storeAll(items: MailTemplate[]): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/mailTemplates/storeOrUpdateAll`, items);
  }

  getByType(type: string): Observable<MailTemplate> {
    return this.httpClient.get<MailTemplate>(`${environment.baseUrl}/mailTemplates/getByType/${type}`);
  }
}
