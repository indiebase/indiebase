import { randomBytes as cryptoRandomBytes } from "crypto";
import { promisify } from "util";

export const randomBytes = promisify(cryptoRandomBytes);
