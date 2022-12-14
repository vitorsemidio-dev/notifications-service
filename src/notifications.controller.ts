import { Body, Controller, Get, Post } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list(): Promise<Notification[]> {
    return this.prismaService.notification.findMany();
  }

  @Post()
  create(@Body() notification: CreateNotificationDto): Promise<Notification> {
    const { category, content, recipientId } = notification;
    return this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
