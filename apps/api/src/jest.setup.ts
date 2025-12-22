import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Clean up database after all tests
afterAll(async () => {
  await prisma.$disconnect();
});

