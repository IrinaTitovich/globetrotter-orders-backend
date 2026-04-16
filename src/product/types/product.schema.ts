import z from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional().nullable(),
});

export type ProductDto = z.infer<typeof ProductSchema>;
