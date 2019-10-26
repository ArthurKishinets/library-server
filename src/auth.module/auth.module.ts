import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users.module/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import consts from '../config';

@Module({
  controllers: [AuthController],
  imports: [
      UsersModule,
      PassportModule.register({
          defaultStrategy: 'jwt',
          session: true
        }),
      JwtModule.register({
        secret: consts.jwtSecret,
        signOptions: { expiresIn: '30d' },
      }),
    ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
