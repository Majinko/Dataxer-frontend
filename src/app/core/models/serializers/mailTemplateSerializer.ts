import {MailTemplate} from '../mailTemplate';

export class MailTemplateSerializer {
  fromJson(json: any): MailTemplate {
    const mailTemplate = new MailTemplate();

    mailTemplate.id = json.id;
    mailTemplate.emailSubject = json.emailSubject;

    return mailTemplate;
  }

  toJson(mailTemplate: MailTemplate): any {
    return {
      id: mailTemplate.id,
      emailSubject: mailTemplate.emailSubject
    };
  }
}
