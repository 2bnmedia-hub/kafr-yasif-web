import { randomBytes } from "crypto";
import { writeFileSync } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { db } from "./index";
import { adminUsers } from "./schema";

async function main() {
  const email = process.argv[2] ?? "admin@kafr-yasif.muni.il";
  const password = process.argv[3] ?? randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(password, 12);

  await db
    .insert(adminUsers)
    .values({ email, passwordHash })
    .onConflictDoUpdate({ target: adminUsers.email, set: { passwordHash } });

  const outPath = path.join(process.cwd(), ".admin-credentials.local.txt");
  writeFileSync(
    outPath,
    `Admin login for /admin\nemail: ${email}\npassword: ${password}\nGenerated: ${new Date().toISOString()}\nDelete this file after you've saved the password somewhere safe.\n`
  );
  console.log("Admin user created/updated. Credentials written to a local file (not printed here).");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
