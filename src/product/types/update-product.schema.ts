import z from 'zod';
import { ProductDto, ProductSchema } from './product.schema';

export const UpdateProductRequestSchema = ProductSchema.pick({
  name: true,
  description: true,
  icon: true,
});

export type UpdateProductRequestDto = z.infer<
  typeof UpdateProductRequestSchema
>;

export const UpdateProductResponseSchema = ProductSchema;

export type UpdateProductResponseDto = ProductDto;
