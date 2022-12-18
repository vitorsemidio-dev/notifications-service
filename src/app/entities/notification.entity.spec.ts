import { Content } from '@app/entities/content';
import { makeNotification } from '@test/factories/notification.factory';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = makeNotification();
    expect(notification).toBeDefined();
  });

  it('should be able to set category', () => {
    const notification = makeNotification();
    notification.category = 'updated';
    expect(notification.category).toBe('updated');
  });

  it('should be able to read', () => {
    const notification = makeNotification();
    expect(notification.readAt).toBeUndefined();
    notification.read();
    expect(notification.readAt).toEqual(expect.any(Date));
  });

  it('should be able to unread', () => {
    const notification = makeNotification();
    expect(notification.readAt).toBeUndefined();
    notification.read();
    expect(notification.readAt).toEqual(expect.any(Date));
    notification.unread();
    expect(notification.readAt).toBeNull();
  });

  it('should be able to cancel', () => {
    const notification = makeNotification();
    expect(notification.canceledAt).toBeUndefined();
    notification.cancel();
    expect(notification.canceledAt).toEqual(expect.any(Date));
  });

  it('should be able to set content', () => {
    const notification = makeNotification();
    notification.content = new Content('updated');
    expect(notification.content.value).toBe('updated');
  });

  it('should be able to create notification with readAt undefined by default', () => {
    const notification = makeNotification();
    expect(notification.readAt).toBeUndefined();
  });

  it('should be able to create notification with createdAt defined by default', () => {
    const notification = makeNotification();
    expect(notification.createdAt).toBeDefined();
  });

  it('should be able to create notification with canceledAt undefined by default', () => {
    const notification = makeNotification();
    expect(notification.canceledAt).toBeUndefined();
  });

  it('should be able to create notification with id', () => {
    const notification = makeNotification();
    expect(notification.id).toBeDefined();
  });

  it('should be able to set id', () => {
    const { id } = makeNotification();
    const notification = makeNotification({ id });
    expect(notification.id).toEqual(id);
  });
});
