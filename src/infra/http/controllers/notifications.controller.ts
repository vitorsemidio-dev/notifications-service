import { CancelNotification } from '@app/use-cases/cancel-notification.service';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification.service';
import { ReadNotification } from '@app/use-cases/read-notification.service';
import { SendNotification } from '@app/use-cases/send-notification.service';
import { UnreadNotification } from '@app/use-cases/unread-notification.service';
import { CancelNotificationResponseDto } from '@infra/http/dtos/cancel-notification-response.dto';
import { CountFromRecipientResponseDto } from '@infra/http/dtos/count-from-recipient-response.dto';
import { CreateNotificationResponseDto } from '@infra/http/dtos/create-notification-response.dto';
import { CreateNotificationDto } from '@infra/http/dtos/create-notification.dto';
import { ReadNotificationResponseDto } from '@infra/http/dtos/read-notification-response.dto';
import { UnreadNotificationResponseDto } from '@infra/http/dtos/unread-notification-response.dto';
import { NotificationViewModel } from '@infra/http/view-models/notification.view-model';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly cancelNotification: CancelNotification,
    private readonly countRecipientNotifications: CountRecipientNotification,
    private readonly readNotification: ReadNotification,
    private readonly sendNotification: SendNotification,
    private readonly unreadNotification: UnreadNotification,
  ) {}

  @Post()
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<CreateNotificationResponseDto> {
    const { category, content, recipientId } = createNotificationDto;
    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
    return { notification: NotificationViewModel.toHTTP(notification) };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<CountFromRecipientResponseDto> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Patch(':id/cancel')
  async cancel(
    @Param('id') notificationId: string,
  ): Promise<CancelNotificationResponseDto> {
    await this.cancelNotification.execute({
      notificationId,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<ReadNotificationResponseDto> {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(
    @Param('id') id: string,
  ): Promise<UnreadNotificationResponseDto> {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }
}
