import { Notification } from '@app/entities/notification.entity';
import { SendNotification } from '@app/use-cases/send-notification.service';
import { CreateNotificationDto } from '@infra/http/dtos/create-notification.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}
  @Post()
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<{ notification: Notification }> {
    const { category, content, recipientId } = createNotificationDto;
    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
    return { notification };
  }
}
