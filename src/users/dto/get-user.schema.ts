import z from 'zod';
import { UserSchema } from './user.schema';

export const GetUserResponseSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
});

export type GetUserResponseDto = z.infer<typeof GetUserResponseSchema>;
