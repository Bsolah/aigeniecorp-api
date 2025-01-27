import crypto from "crypto";
export default function generateSecurePassword(length: number = 16): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const charactersLength = characters.length;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomByte = crypto.randomBytes(1)[0];
    const randomIndex = randomByte % charactersLength;
    password += characters[randomIndex];
  }
  return password;
}
