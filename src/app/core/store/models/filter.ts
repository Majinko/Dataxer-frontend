import {PaginateFilter} from '../../models/filters/PaginateFilter';

export class Filter {
  name: string;
  rsQlFilter: string;
  filteredData: PaginateFilter;
}
