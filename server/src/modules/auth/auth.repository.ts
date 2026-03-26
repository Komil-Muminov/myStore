import { getDatabase } from "../../config/database";
import { UserRecord } from "./auth.types";

export async function findUserByEmail(
  email: string,
): Promise<UserRecord | undefined> {
  const db = await getDatabase();

  return db.get<UserRecord>(
    `
      SELECT id, email, name, password_hash AS passwordHash
      FROM users
      WHERE email = ?
    `,
    email,
  );
}
