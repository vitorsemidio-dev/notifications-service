import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
