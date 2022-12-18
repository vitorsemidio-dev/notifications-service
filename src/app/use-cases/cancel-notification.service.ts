import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';
import { Injectable } from '@nestjs/common';

interface CancelNotificationRequest {
  idNotification: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  async execute({
    idNotification,
  }: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const notification = await this.notificationsRepository.findById(
      idNotification,
    );
    if (!notification) throw new NotificationNotFoundError(idNotification);
    notification.cancel();
    await this.notificationsRepository.save(notification);
  }
}
