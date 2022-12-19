import { SendNotification } from '@app/use-cases/send-notification.service';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

type SendNotificationPayload = {
  content: string;
  category: string;
  recipientId: string;
};

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() content: SendNotificationPayload,
  ): Promise<void> {
    await this.sendNotification.execute(content);
  }
}
