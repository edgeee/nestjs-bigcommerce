type PaginationLinksV3 = {
  current: string;
  next: string;
  previous: string;
};

export type PaginationV3 = {
  count: number;
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  links: PaginationLinksV3;
};

type V3ApiResponseDataMeta = {
  pagination: PaginationV3;
};

export interface V3ApiResponseData<T> {
  data: T;
  meta: V3ApiResponseDataMeta;
}
