import { Notification } from '@app/entities/notification.entity';
import { CreateNotificationResponseDto } from '@infra/http/dtos/create-notification-response.dto';

export class NotificationViewModel {
  static toHTTP(
    notification: Notification,
  ): CreateNotificationResponseDto['notification'] {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
