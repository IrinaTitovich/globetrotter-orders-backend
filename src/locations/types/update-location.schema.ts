import z from 'zod';
import { LocationDto, LocationSchema } from './location.schema';

export const UpdateLocationRequestSchema = LocationSchema.pick({
  name: true,
  city: true,
  country: true,
  lat: true,
  lng: true,
});

export type UpdateLocationRequestDto = z.infer<
  typeof UpdateLocationRequestSchema
>;

export const UpdateLocationResponseSchema = LocationSchema;

export type UpdateLocationResponseDto = LocationDto;
