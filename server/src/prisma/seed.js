const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du remplissage de la base de données...');

  // Nettoyage préalable pour éviter les doublons
  await prisma.event.deleteMany();
  await prisma.training.deleteMany();
  await prisma.user.deleteMany();

  // Hachage d'un mot de passe par défaut pour les mocks
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Insertion des Utilisateurs
  const admin = await prisma.user.create({
    data: {
      name: 'Alice Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'Bob Dupont',
      email: 'bob@example.com',
      password: hashedPassword,
      role: 'USER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Charlie Martin',
      email: 'charlie@example.com',
      password: hashedPassword,
      role: 'USER',
    },
  });

  console.log('✅ Utilisateurs créés');

  // 2. Insertion des Formations (avec association d'utilisateurs)
  const trainingNode = await prisma.training.create({
    data: {
      topic: 'Express.js & Prisma Avancé',
      durationMin: 180,
      users: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
    },
  });

  const trainingReact = await prisma.training.create({
    data: {
      topic: 'React & Tailwind CSS',
      durationMin: 240,
      users: {
        connect: [{ id: user1.id }],
      },
    },
  });

  console.log('✅ Formations créées');

  // 3. Insertion des Événements (liés à leur organisateur)
  await prisma.event.createMany({
    data: [
      {
        title: 'Hackathon Node.js',
        location: 'Paris & Distanciel',
        date: new Date('2026-11-15T09:00:00Z'),
        userId: admin.id,
      },
      {
        title: 'Meetup Dev Web',
        location: 'Lyon',
        date: new Date('2026-12-01T18:30:00Z'),
        userId: user1.id,
      },
    ],
  });

  console.log('✅ Événements créés');
  console.log('🎉 Seeding terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });