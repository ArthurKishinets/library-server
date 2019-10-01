import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Injectable()
export class StaticMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    /*if (!req.path.startsWith('/api')) {
        res.sendFile(join(__dirname, '..', 'library-client', 'build', 'index.html'));
    }*/
    next();
  }
}
