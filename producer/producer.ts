import { Kafka, KafkaConfig } from 'kafkajs';
import { randomUUID } from 'node:crypto';
import * as dotenv from 'dotenv';
dotenv.config();

const makeKafkaConfig = (override: Partial<KafkaConfig> = {}): KafkaConfig => {
  return {
    clientId: 'kafka-producer',
    brokers: process.env.UPSTASH_KAFKA_BROKERS!.split(','),
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.UPSTASH_KAFKA_REST_USERNAME!,
      password: process.env.UPSTASH_KAFKA_REST_PASSWORD!,
    },
    ssl: true,
    ...override,
  };
};

type NotificationMessageProps = {
  recipientId: string;
  content: string;
  category: string;
};

const makeNotificationMessage = (
  override: Partial<NotificationMessageProps> = {},
) => {
  return {
    value: JSON.stringify({
      recipientId: randomUUID(),
      content: 'Nova solicitação de amizade!',
      category: 'Social',
      ...override,
    }),
  };
};

async function bootstrap() {
  const kafka = new Kafka(makeKafkaConfig());
  const producer = kafka.producer();

  console.log('Starting producer...');
  await producer.connect();

  console.log('Sending message...');
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [makeNotificationMessage()],
  });
  console.log('Message sent!');

  console.log('Disconnecting producer...');
  await producer.disconnect();
}

bootstrap();
