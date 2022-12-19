import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaConsumerService = app.get(KafkaConsumerService);
  app.connectMicroservice({
    strategy: kafkaConsumerService,
  });
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
