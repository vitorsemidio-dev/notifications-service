import { Notification } from '@app/entities/notification.entity';
import { GetRecipientNotificationResponseDto } from '@infra/http/dtos/get-recipient-notification.dto';

export class GetRecipientNotificationViewModel {
  static toHTTP(
    notifications: Notification[],
  ): GetRecipientNotificationResponseDto {
    const notificationsViewModel = notifications.map((notification) => {
      return {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
      };
    });

    return {
      notifications: notificationsViewModel,
    };
  }
}
