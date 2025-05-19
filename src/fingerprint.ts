import crypto from "crypto";

export const generateFingerprint = (data: object): string => {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
};
