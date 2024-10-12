import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class HealthController {
  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ message: 'ok' });
  }
}
