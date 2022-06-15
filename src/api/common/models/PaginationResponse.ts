export type PaginationResponse<T> = {
  hasMore: boolean;
  limit: number;
  items: T[];
};
