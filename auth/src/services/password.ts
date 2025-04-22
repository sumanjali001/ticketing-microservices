import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buff = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buff.toString("hex")}.${salt}`;
  }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ) {
    const [hashedPassword, salt] = storedPassword.split(".");
    if (!hashedPassword || !salt) {
      return false; // Ensures the stored password is in the correct format
    }
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    console.log(buf.toString("hex")=== hashedPassword);

    return buf.toString("hex") === hashedPassword;
  }
}
