import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

export function makeNotificationsRepository(): NotificationsRepository {
  const notificationsRepository = new InMemoryNotificationsRepository();
  return notificationsRepository;
}
