export class Content {
  private readonly content: string;

  constructor(content: string) {
    if (!this.validateContentMaxLength(content)) {
      throw new Error('Content length must be less than 255 characters');
    }
    if (!this.validateContentMinLength(content)) {
      throw new Error('Content length must be greater than 5 characters');
    }
    this.content = content;
  }

  private validateContentMaxLength(content: string): boolean {
    return content.length <= 255;
  }

  private validateContentMinLength(content: string): boolean {
    return content.length >= 5;
  }

  get value(): string {
    return this.content;
  }
}
