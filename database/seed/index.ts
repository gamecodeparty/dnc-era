import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Default admin user credentials
const ADMIN_EMAIL = "admin@mail.com";
const ADMIN_PASSWORD = "12345678";
const ADMIN_NAME = "Admin";

async function main() {
  console.log("🌱 Seeding database...\n");

  // Create admin user
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      passwordHash,
      name: ADMIN_NAME,
    },
    create: {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      passwordHash,
    },
  });

  console.log(`✓ Admin user created/updated:`);
  console.log(`  Email: ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log(`  ID: ${adminUser.id}\n`);

  console.log("✅ Seeding complete!\n");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
