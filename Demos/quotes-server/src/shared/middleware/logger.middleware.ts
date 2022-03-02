import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    Logger.log(`${req.method} request to Quotes API: ${req.baseUrl + req.url}`);
    next();
  }
}
