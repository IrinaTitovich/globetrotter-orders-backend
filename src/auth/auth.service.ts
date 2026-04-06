import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.schema';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async register(data: RegisterUserDto): Promise<number> {
    const { id } = await this.userService.create({
      passwordHash: data.password,
      email: data.email,
      role: data.role,
      name: data.role,
    });

    return id;
  }

  async login(data: LoginUserDto) {
    const { id } = await this.userService.getByEmail(data.email);

    return id;
  }

  logout() {}

  me() {}
}
