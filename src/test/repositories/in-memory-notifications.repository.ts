import { Notification } from 'src/app/entities/notification.entity';
import { NotificationsRepository } from 'src/app/repositories/notifications.repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private data: Notification[] = [];
  async create(notification: Notification): Promise<void> {
    this.data.push(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.data.filter((n) => n.recipientId === recipientId).length;
  }

  async findById(id: string): Promise<Notification | null> {
    return this.data.find((n) => n.id === id) || null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.data.filter((n) => n.recipientId === recipientId);
  }

  async save(notification: Notification): Promise<void> {
    const index = this.data.findIndex((n) => n.id === notification.id);
    if (index === -1) throw new Error('Notification not found');
    this.data[index] = notification;
  }
}
