const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Jean Dupont',
        email: 'jean@example.com',
      },
      {
        name: 'Marie Martin',
        email: 'marie@example.com',
      },
      {
        name: 'Paul Bernard',
        email: 'paul@example.com',
      },
    ],
  });

  console.log('Sample users inserted successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
