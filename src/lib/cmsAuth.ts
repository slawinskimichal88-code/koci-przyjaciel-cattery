import { cookies } from "next/headers";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const CREDENTIALS_FILE = path.join(process.cwd(), "data", "cms_creds.json");
const CMS_SESSION_SECRET = process.env.CMS_SESSION_SECRET || "koci_przyjaciel_secret_session_key_2026_x92";
const AUTH_COOKIE_NAME = "cms_session_token";

interface CMSCredentials {
  login: string;
  passwordHash: string; // SHA-256
}

function hashPassword(pass: string): string {
  return crypto.createHash("sha256").update(pass).digest("hex");
}

export function getCredentials(): CMSCredentials {
  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const data = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, "utf8"));
      if (data.login && data.passwordHash) {
        return data;
      }
    }
  } catch (err) {
    console.error("Błąd odczytu credentials:", err);
  }

  // Domyślne wartości z env lub stałe
  const defaultLogin = process.env.CMS_LOGIN || "murzynek";
  const defaultPass = process.env.CMS_PASSWORD || "AgaMroz12%!";
  return {
    login: defaultLogin,
    passwordHash: hashPassword(defaultPass),
  };
}

export function saveCredentials(newLogin: string, newPassword: string): boolean {
  try {
    const dir = path.dirname(CREDENTIALS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const data: CMSCredentials = {
      login: newLogin.trim(),
      passwordHash: hashPassword(newPassword.trim()),
    };
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Błąd zapisu credentials:", err);
    return false;
  }
}

export function verifyCredentials(login: string, password: string): boolean {
  const creds = getCredentials();
  return creds.login === login && creds.passwordHash === hashPassword(password);
}

export function generateSessionToken(login: string): string {
  const payload = `${login}:${Date.now()}`;
  const hmac = crypto.createHmac("sha256", CMS_SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64");
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const [login, timestampStr, hmac] = decoded.split(":");
    const creds = getCredentials();
    if (login !== creds.login) return false;

    const payload = `${login}:${timestampStr}`;
    const expectedHmac = crypto.createHmac("sha256", CMS_SESSION_SECRET).update(payload).digest("hex");
    if (hmac !== expectedHmac) return false;

    const timestamp = parseInt(timestampStr, 10);
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 dni
    if (Date.now() - timestamp > maxAge) return false;

    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export { AUTH_COOKIE_NAME };
