import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification.service';
import { makeNotificationsRepository } from '@test/factories/in-memory-notifications-repository.factory';
import { makeNotification } from '@test/factories/notification.factory';

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
