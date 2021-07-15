import {Resource} from './resource';

export class MailTemplate implements Resource{
  id: number;
  title: string;
  mailTemplateType: string;
  emailSubject: string;
  emailContent: string;
}
