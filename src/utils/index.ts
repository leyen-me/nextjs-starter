import { AES, enc } from 'crypto-js';

const encryptPassword = (password: string): string => {
  const secretKey = process.env.NEXT_PUBLIC_PASSWORD_ENCRYPTION_KEY;
  if (!secretKey) {
    throw new Error('Encryption key is not set in environment variables');
  }
  return AES.encrypt(password, secretKey).toString();
};

const decryptPassword = (encryptedPassword: string): string => {
  const secretKey = process.env.NEXT_PUBLIC_PASSWORD_ENCRYPTION_KEY;
  if (!secretKey) {
    throw new Error('Encryption key is not set in environment variables');
  }
  const bytes = AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(enc.Utf8);
};

export const savePassword = (password: string): void => {
  const encryptedPassword = encryptPassword(password);
  localStorage.setItem("password", encryptedPassword);
};

export const getPassword = (): string | null => {
  const encryptedPassword = localStorage.getItem("password");
  if (!encryptedPassword) return null;
  return decryptPassword(encryptedPassword);
};