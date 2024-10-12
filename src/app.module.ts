import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './contexts/contact/module';
import { SharedModule } from './contexts/shared/module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    SharedModule,
    ContactModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
