import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProductController],
  providers: [ProductService, JwtAuthGuard],
})
export class ProductModule {}
