import { Content } from '@app/entities/content';
import {
  Notification,
  NotificationProps,
} from '@app/entities/notification.entity';
import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { CancelNotification } from '@app/use-cases/cancel-notification.service';
import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';
import { Replace } from '@helpers/replace';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

const makeNotificationsRepository = (): NotificationsRepository => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  return notificationsRepository;
};

const makeNotificationEntity = () => {
  type NotificationConstructorProps = Replace<
    NotificationProps,
    { createdAt?: Date }
  >;
  const notificationConstructorProps: NotificationConstructorProps = {
    category: 'notification',
    content: new Content('notification'),
    recipientId: 'notification',
  };
  const notification = new Notification(notificationConstructorProps);
  return { notification, notificationConstructorProps };
};

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const { notification } = makeNotificationEntity();
    await notificationsRepository.create(notification);
    const sut = new CancelNotification(notificationsRepository);
    await sut.execute({
      idNotification: notification.id,
    });
    const notificationFound = await notificationsRepository.findById(
      notification.id,
    );
    expect(notificationFound?.canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = makeNotificationsRepository();
    const { notification } = makeNotificationEntity();
    const sut = new CancelNotification(notificationsRepository);
    await expect(() => {
      return sut.execute({
        idNotification: notification.id,
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
