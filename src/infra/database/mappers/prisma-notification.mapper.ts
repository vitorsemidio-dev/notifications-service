import { Notification as DomainNotification } from '@app/entities/notification.entity';
import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: DomainNotification): PrismaNotification {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      createdAt: notification.createdAt,
      readAt: notification.readAt || null,
      recipientId: notification.recipientId,
    };
  }
}
