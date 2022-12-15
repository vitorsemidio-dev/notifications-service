import { Injectable } from '@nestjs/common';
import { Notification } from 'src/app/entities/notification.entity';
import { NotificationsRepository } from 'src/app/repositories/notifications.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
      },
    });
  }
}
