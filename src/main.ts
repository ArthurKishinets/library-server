import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module/app.module';
import { StaticMiddleware } from './app.module/static.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    //app.use(new StaticMiddleware());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    await app.listen(3000);
}
bootstrap();
