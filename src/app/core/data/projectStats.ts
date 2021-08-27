export class ProjectStats {
  start: Date;
  end: Date;
  profit: number;
  countUser: number;
  countMonth: number;
  timeStamp: number;
  sumInvoices: number | 0;
  coefficient: number; // number witch is calc profit by time
  sumCost: number | 0;
  isLoad: boolean | false;
}
