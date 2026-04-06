import z from 'zod';
import { UserSchema } from './user.schema';

export const UpdateUserRequestSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
});

export type UpdateUserRequestDto = z.infer<typeof UpdateUserRequestSchema>;

export const UpdateUserResponseSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
});

export type UpdateUserResponseDto = z.infer<typeof UpdateUserResponseSchema>;
