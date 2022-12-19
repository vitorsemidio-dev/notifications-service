import { SendNotification } from '@app/use-cases/send-notification.service';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from '@infra/messaging/controllers/notifications.controller';
import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { SharedModule } from '@infra/shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, SharedModule],
  controllers: [NotificationsController],
  providers: [KafkaConsumerService, SendNotification],
})
export class MessagingModule {}
