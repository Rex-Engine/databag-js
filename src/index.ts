import crypto from "crypto";

type Config = { [key: string]: string | Config };

function decryptString(text: string, password: string): string {
  const textParts = text.split(":");
  const firstPart = textParts.shift();
  if (!firstPart) {
    throw new Error("Invalid encrypted text");
  }
  const iv = Buffer.from(firstPart, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(password, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function decrypt<T extends string | Config>(config: T, password: string): T {
  if (typeof config === "string") {
    return decryptString(config, password) as T;
  }
  return Object.entries(config).reduce((acc, [key, value]) => {
    (acc as any)[key] = decrypt(value, password);
    return acc;
  }, {} as T);
}

export { Config, decrypt };
