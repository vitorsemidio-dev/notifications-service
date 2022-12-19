import { ConfigModule } from '@infra/config/config.module';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, ConfigModule],
  exports: [DatabaseModule, ConfigModule],
})
export class SharedModule {}
