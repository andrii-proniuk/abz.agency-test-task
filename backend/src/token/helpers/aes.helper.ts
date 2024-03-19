import * as crypto from 'crypto';

export const AesHelper = {
  generateIv: (): Buffer => {
    return crypto.randomBytes(16);
  },

  generateMac: (aesKey: Buffer, encrypted: string): string => {
    const hmac = crypto.createHmac('sha256', aesKey);
    hmac.update(encrypted);

    return hmac.digest('hex');
  },

  encryptValue: (aesKey: Buffer, iv: Buffer, value: string): string => {
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);

    let encryptedValue = cipher.update(value, 'utf8', 'base64');
    encryptedValue += cipher.final('base64');

    return encryptedValue;
  },

  decryptValue: (aesKey: Buffer, iv: Buffer, value: string): string => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);

    let decrypted = decipher.update(value, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  },
};
