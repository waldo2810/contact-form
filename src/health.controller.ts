import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('health')
@Controller()
export class HealthController {
  @Get()
  @ApiOperation({
    summary: 'Health check',
    description: 'Check if the service is up and running',
  })
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ message: 'ok' });
  }
}
