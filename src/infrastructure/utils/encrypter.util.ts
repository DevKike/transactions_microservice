import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { LOCAL_ENVIRONMENT } from '../environments/local.environment';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const TAG_LENGTH = 16;
const secretKey = LOCAL_ENVIRONMENT.ENCRYPTION_SECRET_KEY;

export const encrypt = (data: string): string => {
  const iv = randomBytes(IV_LENGTH);
  const salt = randomBytes(SALT_LENGTH);

  const cipher = createCipheriv(ALGORITHM, Buffer.from(secretKey!, 'hex'), iv);

  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(data), 'utf8'),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  const result = Buffer.concat([salt, iv, tag, encrypted]);

  return result.toString('base64');
};

export const decrypt = <T>(encryptedData: string, secretKey: string): T => {
  try {
    const buffer = Buffer.from(encryptedData, 'base64');

    const salt = buffer.subarray(0, SALT_LENGTH);
    const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = buffer.subarray(
      SALT_LENGTH + IV_LENGTH,
      SALT_LENGTH + IV_LENGTH + TAG_LENGTH
    );
    const content = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);

    const decipher = createDecipheriv(
      ALGORITHM,
      Buffer.from(secretKey, 'hex'),
      iv
    );
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
      decipher.update(content),
      decipher.final(),
    ]);

    const decryptedString = decrypted.toString('utf8');
    return JSON.parse(decryptedString) as T;
  } catch (error: any) {
    throw new Error(`Decryption failed, error: ${error.message}`);
  }
};
