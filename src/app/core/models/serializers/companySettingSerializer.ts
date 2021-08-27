import {CompanySetting} from '../companySetting';

export class CompanySettingSerializer {
  fromJson(json: any): CompanySetting {
    const companySetting = new CompanySetting();

    companySetting.id = json.id;
    companySetting.companySettingType = json.companySettingType;
    companySetting.data = json.data;

    return companySetting;
  }

  toJson(companySetting: CompanySetting): any {
    return {
      id: companySetting.id,
      companySettingType: companySetting.companySettingType,
      data: companySetting.data
    };
  }
}
