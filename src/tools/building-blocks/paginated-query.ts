export interface PaginationPayload {
  page: number;
  limit: number;
}

export interface PaginatedResponse<PayloadType> {
  items: PayloadType[];
  total: number;
}

export interface PaginatedQuery<PayloadType extends object = {}> {
  payload: PayloadType & PaginationPayload;
}
