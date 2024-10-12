import { Module } from '@nestjs/common';
import { ContactModule } from './contexts/contact/module';
import { SharedModule } from './contexts/shared/module';
import { HealthController } from './health.controller';

@Module({
  imports: [SharedModule, ContactModule],
  controllers: [HealthController],
})
export class AppModule {}
