import {MailTemplate} from '../models/mailTemplate';

export const DEFAULTMAILTEMPLATES: MailTemplate[] = [
  {
    id: null,
    title: 'Faktúra',
    mailTemplateType: 'INVOICE',
    emailSubject: 'Faktúra #CISLO',
    emailContent: 'Dobrý deň,<br><br>v prílohe posielame faktúru č. #CISLO#.<br><br>Suma na úhradu: #SUMA<br>Variabilný key: #VAR<br>Číslo účtu: #IBAN#<br><br>Ďakujeme za úhradu a prajeme príjemný deň.'
  },
  {
    id: null,
    mailTemplateType: 'PROFORMA',
    title: 'Zálohová faktúra',
    emailSubject: 'Zálohová faktúra #CISLO',
    emailContent: 'Dobrý deň,<br><br>v prílohe posielame zálohovú faktúru č. #CISLO.<br><br>Suma na úhradu: #SUMA#<br>Variabilný key: #VAR#<br>Číslo účtu: #IBAN#<br><br>Ďakujeme za úhradu a prajeme príjemný deň.<br>'
  }
];

export const EMAILVARIABLES: { key: string; value: string }[] = [
  {
    key: '#CISLO#',
    value: 'Číslo dokladu',
  },
  {
    key: '#NAZOV#',
    value: 'Názov dokladu',
  },
  {
    key: '#VAR#',
    value: 'Variabilný key',
  },
  {
    key: '#SUMA#',
    value: 'Suma na úhradu',
  },
];
