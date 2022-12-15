import { Notification } from 'src/app/entities/notification.entity';
import { NotificationsRepository } from 'src/app/repositories/notifications.repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private data: Notification[] = [];
  async create(notification: Notification): Promise<void> {
    this.data.push(notification);
  }
}
