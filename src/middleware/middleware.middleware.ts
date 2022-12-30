import { Injectable, NestMiddleware, Next } from '@nestjs/common';
import { Request, Response } from 'express';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class MiddlewareMiddleware implements NestMiddleware {
  constructor(private readonly utils: UtilsService) {}
  use(req: Request, res: Response, @Next() next) {
    req.body = this.utils.fieldsToBD(req.body);
    next();
  }
}
