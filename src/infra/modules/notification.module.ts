import { CancelNotification } from '@app/use-cases/cancel-notification.service';
import { SendNotification } from '@app/use-cases/send-notification.service';
import { NotificationsController } from '@infra/http/controllers/notifications.controller';
import { SharedModule } from '@infra/shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule],
  controllers: [NotificationsController],
  providers: [CancelNotification, SendNotification],
})
export class NotificationModule {}
