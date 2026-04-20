import z from 'zod';
import { LocationSchema } from './location.schema';

export const CreateLocationRequestSchema = LocationSchema.pick({
  name: true,

  city: true,
  country: true,

  lat: true,
  lng: true,
});

export type CreateLocationRequestDto = z.infer<
  typeof CreateLocationRequestSchema
>;

export const CreateLocationResponseSchema = LocationSchema.pick({
  id: true,
});

export type CreateLocationResponseDto = z.infer<
  typeof CreateLocationResponseSchema
>;
