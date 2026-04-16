import z from 'zod';
import { ProductSchema } from './product.schema';

export const CreateProductRequestSchema = ProductSchema.pick({
  name: true,
  description: true,
  icon: true,
});

export type CreateProductRequestDto = z.infer<
  typeof CreateProductRequestSchema
>;

export const CreateProductResponseSchema = ProductSchema.pick({
  id: true,
});

export type CreateProductResponseDto = z.infer<
  typeof CreateProductResponseSchema
>;
