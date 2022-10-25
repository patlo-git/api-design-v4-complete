// setting up the prisma sdk to run once and then we import it wherever we want
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;