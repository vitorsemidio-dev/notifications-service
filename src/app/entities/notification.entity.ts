import { Content } from '@app/entities/content';
import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface NotificationProps {
  category: string;
  content: Content;
  createdAt: Date;
  readAt?: Date | null;
  canceledAt?: Date | null;
  recipientId: string;
}

export class Notification {
  private readonly _id: string;
  private props: NotificationProps;
  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = Object.assign(props, {
      createdAt: props.createdAt ?? new Date(),
    });
  }

  public get id(): string {
    return this._id;
  }
  set category(value: string) {
    this.props.category = value;
  }
  public get category(): string {
    return this.props.category;
  }
  set content(value: Content) {
    this.props.content = value;
  }
  public get content(): Content {
    return this.props.content;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
  read() {
    this.props.readAt = new Date();
  }
  unread() {
    this.props.readAt = null;
  }
  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }
  cancel() {
    this.props.canceledAt = new Date();
  }
  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }
  set recipientId(value: string) {
    this.props.recipientId = value;
  }
  public get recipientId(): string {
    return this.props.recipientId;
  }
}
