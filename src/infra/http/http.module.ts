import { NotificationModule } from '@infra/modules/notification.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [NotificationModule],
})
export class HttpModule {}
