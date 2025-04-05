import prisma from "../prisma/client";

async function main() {
  await prisma.user.create({
    data: {
      fullName: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "ADMIN"
    }
  });
  console.log("Admin user created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
