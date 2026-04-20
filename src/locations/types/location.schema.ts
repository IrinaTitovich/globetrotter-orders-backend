import z from 'zod';

export const LocationSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  city: z.string(),
  country: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export type LocationDto = z.infer<typeof LocationSchema>;
