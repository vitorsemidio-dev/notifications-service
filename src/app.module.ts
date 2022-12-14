import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
