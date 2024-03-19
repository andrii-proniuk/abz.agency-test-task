export interface LinksResponseDto {
  prev_url: string | null;
  next_url: string | null;
}

export interface PaginationResponseDto {
  page: number;
  total_pages: number;
  total_count: number;
  count: number;
  links: LinksResponseDto;
}