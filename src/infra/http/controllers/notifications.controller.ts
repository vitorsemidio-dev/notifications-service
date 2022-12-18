import { CancelNotification } from '@app/use-cases/cancel-notification.service';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification.service';
import { SendNotification } from '@app/use-cases/send-notification.service';
import { CountFromRecipientResponseDto } from '@infra/http/dtos/count-from-recipient-response.dto';
import { CreateNotificationResponseDto } from '@infra/http/dtos/create-notification-response.dto';
import { CreateNotificationDto } from '@infra/http/dtos/create-notification.dto';
import { NotificationViewModel } from '@infra/http/view-models/notification.view-model';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly cancelNotification: CancelNotification,
    private readonly countRecipientNotifications: CountRecipientNotification,
    private readonly sendNotification: SendNotification,
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
  async cancel(@Param('id') idNotification: string): Promise<void> {
    await this.cancelNotification.execute({
      idNotification,
    });
  }
}
