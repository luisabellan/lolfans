import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create roles
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

  // Create users
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      avatar: 'https://i.pravatar.cc/150?u=alice',
      role: {
        connect: { id: userRole.id },
      },
    },
  });
  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      avatar: 'https://i.pravatar.cc/150?u=bob',
      role: {
        connect: { id: adminRole.id },
      },
    },
  });

  // Create games
  const game1 = await prisma.game.create({
    data: {
      title: 'Game 1',
      description: 'This is a cool game.',
      published: true,
      author: {
        connect: { id: alice.id },
      },
    },
  });
  const game2 = await prisma.game.create({
    data: {
      title: 'Game 2',
      description: 'This is another cool game.',
      published: false,
      author: {
        connect: { id: bob.id },
      },
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
