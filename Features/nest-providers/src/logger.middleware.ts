import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class loggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        console.log(req.method, req.url, req.body);
        next();
    }

}