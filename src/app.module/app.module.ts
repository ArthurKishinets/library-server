import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config';
import { Book } from '../book.entity';
import { StaticMiddleware } from './static.middleware';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: configuration.host,
            port: configuration.port,
            username: configuration.username,
            password: configuration.password,
            database: configuration.database,
            entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
            //entities: ['../**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Book]),
        ServeStaticModule.forRoot({
            rootPath: '/home/arthur/projects/library-client/dist'
        }),

    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(StaticMiddleware)
          .forRoutes('*')
    }
}
