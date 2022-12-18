import { makeNotificationsRepository } from '@test/factories/in-memory-notifications-repository.factory';
import { makeNotification } from '@test/factories/notification.factory';
import { GetRecipientNotification } from './get-recipient-notification.service';

describe('Get Recipient Notification', () => {
  it('should be able to get notification from recipient', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const sut = new GetRecipientNotification(notificationsRepository);
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

    const { notifications: notifications1 } = await sut.execute({
      recipientId: recipientId1,
    });
    const { notifications: notifications2 } = await sut.execute({
      recipientId: recipientId2,
    });

    expect(notifications1).toHaveLength(2);
    expect(notifications1).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: recipientId1,
        }),
        expect.objectContaining({
          recipientId: recipientId1,
        }),
      ]),
    );
    expect(notifications2).toHaveLength(1);
    expect(notifications2).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: recipientId2,
        }),
      ]),
    );
  });
});
