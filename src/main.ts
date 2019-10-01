import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module/app.module';
import { StaticMiddleware } from './app.module/static.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api');
  //app.use(new StaticMiddleware());
  await app.listen(3000);
}
bootstrap();
