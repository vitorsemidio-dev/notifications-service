export type CreateNotificationResponseDto = {
  notification: {
    id: string;
    content: string;
    category: string;
    recipientId: string;
  };
};
