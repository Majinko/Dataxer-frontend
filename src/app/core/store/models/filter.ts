import {PaginateFilter} from '../../models/filters/PaginateFilter';

export interface Filter {
  name: string;
  rsQlFilter: string;
  filteredData: PaginateFilter;
}
