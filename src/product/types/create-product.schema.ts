import z from 'zod';
import { ProductSchema } from './product.schema';

export const CreateProductRequestSchema = ProductSchema.pick({
  name: true,
});

export type CreateProductRequestDto = z.infer<
  typeof CreateProductRequestSchema
>;

export const CreateProductResponseSchema = ProductSchema.pick({
  name: true,
  id: true,
});

export type CreateProductResponseDto = z.infer<
  typeof CreateProductResponseSchema
>;
