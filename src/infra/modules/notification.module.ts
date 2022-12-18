import { CancelNotification } from '@app/use-cases/cancel-notification.service';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification.service';
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notification.service';
import { ReadNotification } from '@app/use-cases/read-notification.service';
import { SendNotification } from '@app/use-cases/send-notification.service';
import { UnreadNotification } from '@app/use-cases/unread-notification.service';
import { NotificationsController } from '@infra/http/controllers/notifications.controller';
import { SharedModule } from '@infra/shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule],
  controllers: [NotificationsController],
  providers: [
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    SendNotification,
    UnreadNotification,
  ],
})
export class NotificationModule {}
