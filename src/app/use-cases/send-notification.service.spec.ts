import { SendNotification } from '@app/use-cases/send-notification.service';
import { makeNotificationsRepository } from '@test/factories/in-memory-notifications-repository.factory';

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
