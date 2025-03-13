import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from '@/modules/products/products.module';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    JwtModule.register({
      global: true,
      secret: 'haha',
      signOptions: { expiresIn: '60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
