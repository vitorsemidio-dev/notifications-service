import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';
import { ReadNotification } from '@app/use-cases/read-notification.service';
import { makeNotificationsRepository } from '@test/factories/in-memory-notifications-repository.factory';
import { makeNotification } from '@test/factories/notification.factory';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const notification = makeNotification();
    await notificationsRepository.create(notification);
    const sut = new ReadNotification(notificationsRepository);
    await sut.execute({
      notificationId: notification.id,
    });
    const notificationFound = await notificationsRepository.findById(
      notification.id,
    );
    expect(notificationFound?.readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const notification = makeNotification();
    const sut = new ReadNotification(notificationsRepository);
    await expect(() => {
      return sut.execute({
        notificationId: notification.id,
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
