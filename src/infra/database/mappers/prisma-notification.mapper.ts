import { Content } from '@app/entities/content';
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
      canceledAt: notification.canceledAt || null,
      recipientId: notification.recipientId,
    };
  }
  static toDomain(raw: PrismaNotification): DomainNotification {
    return new DomainNotification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
