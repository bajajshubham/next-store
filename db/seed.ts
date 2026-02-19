import sampleData from "./sample-data";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  const prisma = new PrismaClient({ adapter, });

  await prisma.product.deleteMany()

  await prisma.product.createMany({ data: sampleData.products });


  console.log('Database seeded successfully!!!')
}
main()