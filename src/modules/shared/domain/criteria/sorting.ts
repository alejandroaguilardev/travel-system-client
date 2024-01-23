export enum OrderValue {
  ASC = 'asc',
  DESC = 'desc',
}

export interface Sorting {
  orderBy: string,
  orderType: OrderValue,
}

