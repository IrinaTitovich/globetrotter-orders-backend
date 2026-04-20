import z from 'zod';
import { LocationDto, LocationSchema } from './location.schema';

export const UpdateProductRequestSchema = LocationSchema.pick({
  name: true,
});

export type UpdateProductRequestDto = z.infer<
  typeof UpdateProductRequestSchema
>;

export const UpdateProductResponseSchema = LocationSchema;

export type UpdateProductResponseDto = LocationDto;
