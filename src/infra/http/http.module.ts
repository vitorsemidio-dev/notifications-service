import { CancelNotification } from '@app/use-cases/cancel-notification.service';
import { SendNotification } from '@app/use-cases/send-notification.service';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from '@infra/http/controllers/notifications.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [CancelNotification, SendNotification],
})
export class HttpModule {}
