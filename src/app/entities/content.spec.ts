import { Content } from '@app/entities/content';

describe('Notification Content', () => {
  it('should throw an error if content length is greater than 255 characters', () => {
    expect(() => new Content('a'.repeat(256))).toThrowError(
      'Content length must be less than 255 characters',
    );
  });
  it('should throw an error if content length is less than 5 characters', () => {
    expect(() => new Content('a'.repeat(4))).toThrowError(
      'Content length must be greater than 5 characters',
    );
  });
  it('should not throw an error if content length is between 5 and 255 characters', () => {
    expect(() => new Content('a'.repeat(255))).not.toThrowError();
  });
});
