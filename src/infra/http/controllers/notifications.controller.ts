import { SendNotification } from '@app/use-cases/send-notification.service';
import { CreateNotificationResponseDto } from '@infra/http/dtos/create-notification-response.dto';
import { CreateNotificationDto } from '@infra/http/dtos/create-notification.dto';
import { NotificationViewModel } from '@infra/http/view-models/notification.view-model';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}
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
}
