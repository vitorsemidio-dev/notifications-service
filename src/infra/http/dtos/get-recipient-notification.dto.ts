export type GetRecipientNotificationResponseDto = {
  notifications: Array<{
    id: string;
    content: string;
    category: string;
    recipientId: string;
  }>;
};
