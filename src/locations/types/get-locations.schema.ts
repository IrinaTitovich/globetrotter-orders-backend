import { LocationDto } from './location.schema';

export interface LocationsDto {
  locations: LocationDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type GetLocationsResponseDto = LocationsDto;
