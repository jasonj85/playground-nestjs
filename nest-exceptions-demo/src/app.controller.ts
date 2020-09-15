import { Controller, Get, Req, HttpException, Param, ForbiddenException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';

import * as fs from 'fs';
import { FileNotFoundException } from './file-not-found.exception';
import { MyCustomExceptionFilter } from './my-custom-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/hello')
  hello() {
    throw new ForbiddenException();
  }

  @Get('/:filename')
  sendFile(@Param('filename') filename: string) {
    try {
      let content = fs.readFileSync(filename, 'utf-8');
      return content;
    }
    catch (e) {
      let err = {
        timestamp: new Date().toISOString(),
        message: e.message
      };
      throw new FileNotFoundException(err);
    }
  }

  @Get()
  getHello(@Req() req): string {
    let auth = req.header('Authorization');

    if (!auth) {
      let err = {
        code: 403,
        desc: {
          short: 'Forbidden',
          long: 'Authorization header is missing in the request'
        },
        timestamp: new Date().toISOString()
      };
      throw new HttpException(err, 403);
    }
    return this.appService.getHello();
  }
}
