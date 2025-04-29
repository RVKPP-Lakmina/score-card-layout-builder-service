export class Helpers {
  static generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  static generateRandomNumber(length: number): string {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  keyGenarate(sectionName: string): string {
    return sectionName
      .replace(/[^a-zA-Z\s]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-');
  }

  getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
  }

  generateUniqueId() {
    return (
      Date.now().toString(36) + Math.random().toString(36).substring(2, 15)
    );
  }
}
