import z from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
});

export type ProductDto = z.infer<typeof ProductSchema>;
