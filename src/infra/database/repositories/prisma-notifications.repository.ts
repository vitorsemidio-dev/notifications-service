import { Notification } from '@app/entities/notification.entity';
import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { PrismaNotificationMapper } from '@infra/database/mappers/prisma-notification.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Notification | null> {
    const raw = await this.prismaService.notification.findUnique({
      where: { id },
    });
    if (!raw) return null;
    return PrismaNotificationMapper.toDomain(raw);
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
