import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';
import { UnreadNotification } from '@app/use-cases/unread-notification.service';
import { makeNotificationsRepository } from '@test/factories/in-memory-notifications-repository.factory';
import { makeNotification } from '@test/factories/notification.factory';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const notification = makeNotification({ readAt: new Date() });
    await notificationsRepository.create(notification);
    const sut = new UnreadNotification(notificationsRepository);
    expect(notification?.readAt).toEqual(expect.any(Date));
    await sut.execute({
      notificationId: notification.id,
    });
    const notificationFound = await notificationsRepository.findById(
      notification.id,
    );
    expect(notificationFound?.readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const notification = makeNotification();
    const sut = new UnreadNotification(notificationsRepository);
    await expect(() => {
      return sut.execute({
        notificationId: notification.id,
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
