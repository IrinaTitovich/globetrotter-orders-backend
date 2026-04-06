import z from 'zod';
import { UserSchema } from './user.schema';

export const CreateUserRequestSchema = UserSchema.pick({
  email: true,
  name: true,
  passwordHash: true,
  role: true,
});

export type CreateUserRequestDto = z.infer<typeof CreateUserRequestSchema>;

export const CreateUserResponseSchema = UserSchema.pick({
  email: true,
  name: true,
  id: true,
});

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseSchema>;
