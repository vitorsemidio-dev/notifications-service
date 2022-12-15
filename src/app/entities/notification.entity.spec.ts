import { Replace } from 'src/helpers/replace';
import { Content } from './content';
import { Notification, NotificationProps } from './notification.entity';

const makeSut = () => {
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

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const { notificationConstructorProps } = makeSut();
    const notification = new Notification(notificationConstructorProps);
    expect(notification).toBeDefined();
  });

  it('should be able to set category', () => {
    const { notificationConstructorProps } = makeSut();
    const notification = new Notification(notificationConstructorProps);
    notification.category = 'updated';
    expect(notification.category).toBe('updated');
  });
  it('should be able to set content', () => {
    const { notificationConstructorProps } = makeSut();
    const notification = new Notification(notificationConstructorProps);
    notification.content = new Content('updated');
    expect(notification.content.value).toBe('updated');
  });
  it('should be able to create notification with readAt undefined by default', () => {
    const { notificationConstructorProps } = makeSut();
    const notification = new Notification(notificationConstructorProps);
    expect(notification.readAt).toBeUndefined();
  });
  it('should be able to create notification with createdAt defined by default', () => {
    const { notificationConstructorProps } = makeSut();
    const notification = new Notification(notificationConstructorProps);
    expect(notification.createdAt).toBeDefined();
  });
});
