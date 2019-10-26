import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersProviders } from './users.providers';
import { AuthModule } from '../auth.module/auth.module';

@Module({
    providers: [UsersService, ...UsersProviders],
    exports: [UsersService],
    imports: [forwardRef(() => AuthModule)]
})
export class UsersModule { }