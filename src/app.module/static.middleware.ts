import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Injectable()
export class StaticMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: Function) {
		next();
	}
}
