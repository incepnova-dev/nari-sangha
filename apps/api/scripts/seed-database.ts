import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

interface UserData {
  email: string;
  name: string;
  password: string;
}

// Generate sample user data
const generateUsers = (): UserData[] => {
  const users: UserData[] = [
    { email: 'alice.johnson@example.com', name: 'Alice Johnson', password: 'password123' },
    { email: 'bob.smith@example.com', name: 'Bob Smith', password: 'password123' },
    { email: 'charlie.brown@example.com', name: 'Charlie Brown', password: 'password123' },
    { email: 'diana.prince@example.com', name: 'Diana Prince', password: 'password123' },
    { email: 'emma.watson@example.com', name: 'Emma Watson', password: 'password123' },
    { email: 'frank.miller@example.com', name: 'Frank Miller', password: 'password123' },
    { email: 'grace.hopper@example.com', name: 'Grace Hopper', password: 'password123' },
    { email: 'henry.ford@example.com', name: 'Henry Ford', password: 'password123' },
    { email: 'isabella.swan@example.com', name: 'Isabella Swan', password: 'password123' },
    { email: 'jack.sparrow@example.com', name: 'Jack Sparrow', password: 'password123' },
  ];

  return users;
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing users (optional - comment out if you want to keep existing data)
    const deleteCount = await prisma.user.deleteMany();
    console.log(`🗑️  Deleted ${deleteCount.count} existing users`);

    // Generate user data
    const usersData = generateUsers();

    // Hash passwords and create users
    const users = await Promise.all(
      usersData.map(async (userData) => {
        const hashedPassword = await hashPassword(userData.password);
        return {
          email: userData.email,
          name: userData.name,
          password: hashedPassword,
        };
      })
    );

    // Insert users into database
    const createdUsers = await Promise.all(
      users.map((user) =>
        prisma.user.create({
          data: user,
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
          },
        })
      )
    );

    console.log(`✅ Successfully created ${createdUsers.length} users:`);
    createdUsers.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name} (${user.email}) - ID: ${user.id}`);
    });

    console.log('\n✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('🎉 Seed script finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed script failed:', error);
    process.exit(1);
  });

