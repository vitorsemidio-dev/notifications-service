import { Content } from '@app/entities/content';
import {
  Notification,
  NotificationProps,
} from '@app/entities/notification.entity';
import { Replace } from '@helpers/replace';

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

  it('should be able to read', () => {
    const { notificationConstructorProps } = makeSut();
    const notification = new Notification(notificationConstructorProps);
    expect(notification.readAt).toBeUndefined();
    notification.read();
    expect(notification.readAt).toEqual(expect.any(Date));
  });

  it('should be able to unread', () => {
    const { notificationConstructorProps } = makeSut();
    const notification = new Notification(notificationConstructorProps);
    expect(notification.readAt).toBeUndefined();
    notification.read();
    expect(notification.readAt).toEqual(expect.any(Date));
    notification.unread();
    expect(notification.readAt).toBeNull();
  });

  it('should be able to cancel', () => {
    const { notificationConstructorProps } = makeSut();
    const notification = new Notification(notificationConstructorProps);
    expect(notification.canceledAt).toBeUndefined();
    notification.cancel();
    expect(notification.canceledAt).toEqual(expect.any(Date));
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

  it('should be able to create notification with canceledAt undefined by default', () => {
    const { notificationConstructorProps } = makeSut();
    const notification = new Notification(notificationConstructorProps);
    expect(notification.canceledAt).toBeUndefined();
  });
});
