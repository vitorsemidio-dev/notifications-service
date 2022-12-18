import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

type CountRecipientNotificationResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  async execute({
    recipientId: idNotification,
  }: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
    const count = await this.notificationsRepository.countManyByRecipientId(
      idNotification,
    );
    return { count };
  }
}
