import {Resource} from './resource';

export class MailTemplate implements Resource{
  id: number;
  title: string;
  type: string;
  emailSubject: string;
  emailContent: string;
}
