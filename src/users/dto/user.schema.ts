import z from 'zod';
import { Role } from '@prisma/client';

export const UserSchema = z.object({
  id: z.number().nonnegative(),
  email: z.email(),
  name: z.string().min(1).optional().nullable(),
  role: z.enum([Role.USER, Role.ADMIN]),
  passwordHash: z.string().min(1),
});

export type UserDto = z.infer<typeof UserSchema>;
