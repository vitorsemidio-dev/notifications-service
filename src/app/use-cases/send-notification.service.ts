import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification.entity';
import { NotificationsRepository } from '../repositories/notifications.repository';

interface SendNotifiicationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  async execute({
    recipientId,
    content,
    category,
  }: SendNotifiicationRequest): Promise<SendNotificationResponse> {
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });
    await this.notificationsRepository.create(notification);
    return { notification };
  }
}
