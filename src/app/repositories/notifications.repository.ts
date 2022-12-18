import { Notification } from '@app/entities/notification.entity';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract save(notification: Notification): Promise<void>;
}
