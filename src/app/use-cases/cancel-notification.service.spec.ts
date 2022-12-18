import { CancelNotification } from '@app/use-cases/cancel-notification.service';
import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';
import { makeNotificationsRepository } from '@test/factories/in-memory-notifications-repository.factory';
import { makeNotification } from '@test/factories/notification.factory';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const notification = makeNotification();
    await notificationsRepository.create(notification);
    const sut = new CancelNotification(notificationsRepository);
    await sut.execute({
      notificationId: notification.id,
    });
    const notificationFound = await notificationsRepository.findById(
      notification.id,
    );
    expect(notificationFound?.canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const notification = makeNotification();
    const sut = new CancelNotification(notificationsRepository);
    await expect(() => {
      return sut.execute({
        notificationId: notification.id,
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
