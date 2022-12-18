import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';
import { Injectable } from '@nestjs/common';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  async execute({
    notificationId,
  }: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );
    if (!notification) throw new NotificationNotFoundError(notificationId);
    notification.read();
    await this.notificationsRepository.save(notification);
  }
}
