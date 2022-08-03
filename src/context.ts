import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export type GraphQLContext = {
    prisma: PrismaClient
    greet: () => void
}

export async function createContext(): Promise<GraphQLContext> {
  return {
    greet: () => {console.log('Hello World!')},
    prisma: prisma
  }
}