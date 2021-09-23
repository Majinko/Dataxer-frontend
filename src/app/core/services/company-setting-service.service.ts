import {Injectable} from '@angular/core';
import {ResourceService} from '../class/ResourceService';
import {CompanySetting} from '../models/companySetting';
import {HttpClient} from '@angular/common/http';
import {CompanySettingSerializer} from '../models/serializers/companySettingSerializer';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingServiceService extends ResourceService<CompanySetting> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'companySetting',
      new CompanySettingSerializer());
  }
}
