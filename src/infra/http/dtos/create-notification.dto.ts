import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @Length(5, 255)
  content: string;

  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}
