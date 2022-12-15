import { InMemoryNotificationsRepository } from '../../test/repositories/in-memory-notifications.repository';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { SendNotification } from './send-notification.service';

const makeNotificationsRepository = (): NotificationsRepository => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  return notificationsRepository;
};

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepositoryStub = makeNotificationsRepository();
    const sut = new SendNotification(notificationsRepositoryStub);
    const response = await sut.execute({
      recipientId: 'notification',
      content: 'notification',
      category: 'notification',
    });
    expect(response.notification).toBeDefined();
  });
});
