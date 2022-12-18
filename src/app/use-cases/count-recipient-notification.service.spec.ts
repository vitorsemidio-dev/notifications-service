import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification.service';
import { makeNotification } from '@test/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

const makeNotificationsRepository = (): NotificationsRepository => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  return notificationsRepository;
};

describe('Count Recipient Notification', () => {
  it('should be able to count a notification', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const sut = new CountRecipientNotification(notificationsRepository);
    const recipientId1 = 'recipient-1';
    const recipientId2 = 'recipient-2';
    await notificationsRepository.create(
      makeNotification({
        recipientId: recipientId1,
      }),
    );
    await notificationsRepository.create(
      makeNotification({
        recipientId: recipientId1,
      }),
    );
    await notificationsRepository.create(
      makeNotification({
        recipientId: recipientId2,
      }),
    );

    const { count: count1 } = await sut.execute({
      recipientId: recipientId1,
    });
    const { count: count2 } = await sut.execute({
      recipientId: recipientId2,
    });

    expect(count1).toEqual(2);
    expect(count2).toEqual(1);
  });
});
