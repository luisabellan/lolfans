import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create some example games
  const game1 = await prisma.game.create({
    data: {
      title: 'Game 1',
      description: 'This is the first game',
      published: true,
    },
  });

  const game2 = await prisma.game.create({
    data: {
      title: 'Game 2',
      description: 'This is the second game',
      published: false,
    },
  });

  // Create some example roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'USER',
    },
  });

  // Create some example users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      roles: {
        connect: [{ id: userRole.id }],
      },
      accounts: {
        create: [
          {
            type: 'email',
            provider: 'email',
            providerAccountId: 'alice@example.com',
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      roles: {
        connect: [{ id: adminRole.id }, { id: userRole.id }],
      },
      accounts: {
        create: [
          {
            type: 'google',
            provider: 'google',
            providerAccountId: '1234567890',
          },
        ],
      },
    },
  });

  console.log('Seeding successful!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
