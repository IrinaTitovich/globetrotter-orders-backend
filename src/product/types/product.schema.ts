import z from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  description: z.string().max(200).optional(),
  icon: z.string().nullable(),
});

export type ProductDto = z.infer<typeof ProductSchema>;
