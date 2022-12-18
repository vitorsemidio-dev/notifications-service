import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';
import { Injectable } from '@nestjs/common';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  async execute({
    notificationId,
  }: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );
    if (!notification) throw new NotificationNotFoundError(notificationId);
    notification.unread();
    await this.notificationsRepository.save(notification);
  }
}
