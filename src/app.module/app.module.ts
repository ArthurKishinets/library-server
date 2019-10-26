import { Module, NestModule, MiddlewareConsumer, forwardRef } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import configuration from '../config';
//import { Book } from '../book.entity';
// import { StaticMiddleware } from './static.middleware';
import { AuthModule } from '../auth.module/auth.module';
import { DatabaseModule } from '../database.module/database.module';
import { UsersModule } from '../users.module/users.module';

@Module({
    controllers: [AppController],
    providers: [],
    imports: [
        //TypeOrmModule.forRoot({
            //type: 'postgres',
            //host: configuration.host,
            //port: configuration.port,
            //username: configuration.username,
            //password: configuration.password,
            //database: configuration.database,
            ///entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
            //synchronize: true,
        //}),
        //TypeOrmModule.forFeature([Book]),
        ServeStaticModule.forRoot({
            rootPath: '/home/arthur/projects/library-client/dist'
        }),
        forwardRef(() => AuthModule),
        DatabaseModule,
        UsersModule
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          // .apply(StaticMiddleware)
          // .forRoutes('*')
    }
}
