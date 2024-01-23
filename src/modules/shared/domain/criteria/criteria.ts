import { Filter } from './filters';
import { GlobalFilterProperties } from './global-filter-properties';
import { Sorting } from './sorting';

export interface Criteria {
  start: number;
  size: number;
  filters: Filter[];
  sorting: Sorting[];
  globalFilter: string;
  globalFilterProperties: GlobalFilterProperties[];
  selectProperties: string[];
}

export const criteriaToQueryString = (criteria: Criteria): string => {
  const searchParams = new URLSearchParams();
  searchParams.set('start', `${criteria.start}`,);
  searchParams.set('size', `${criteria.size}`);
  searchParams.set('filters', JSON.stringify(criteria.filters));
  searchParams.set('globalFilter', criteria.globalFilter);
  searchParams.set('sorting', JSON.stringify(criteria.sorting));
  searchParams.set('globalFilterProperties', JSON.stringify(criteria.globalFilterProperties));
  searchParams.set('selectProperties', JSON.stringify(criteria.selectProperties));
  return `?${searchParams.toString()}`;
}

