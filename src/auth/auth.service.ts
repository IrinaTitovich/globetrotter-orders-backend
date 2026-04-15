import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.schema';
import { UsersCoreService } from '../users-core/users-core.service';
import { LoginUserDto } from './dto/login-user.schema';
import { PasswordService } from './password/password.service';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersCoreService,
    private passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async register(data: RegisterUserDto): Promise<number> {
    const passwordHash = await this.passwordService.hash(data.password);

    const { id } = await this.userService.create({
      passwordHash,
      email: data.email,
      role: data.role,
      name: data.role,
    });

    return id;
  }

  async login(data: LoginUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
    userId: number;
  }> {
    const { id, passwordHash, email } = await this.userService.getByEmail(
      data.email,
    );

    const isPasswordValid = await this.passwordService.compare(
      data.password,
      passwordHash,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException();
    }

    const accessToken = await this.tokenService.signAccessToken({
      sub: id,
      email,
    });

    const refreshToken = await this.tokenService.signRefreshToken({
      sub: id,
      email,
    });

    return {
      accessToken,
      refreshToken,
      userId: id,
    };
  }

  me() {}
}
