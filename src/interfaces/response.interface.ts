export interface SingleResponse<T> {
  data: T;
}

export interface ListResponse<T> {
  total: number;
  data: T[];
}
