import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaNotificationsRepository } from '@infra/database/repositories/prisma-notifications.repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
