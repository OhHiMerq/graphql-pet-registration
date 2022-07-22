import { makeExecutableSchema } from '@graphql-tools/schema'
import type { GraphQLContext } from './context'
import type { PetAccounts } from '@prisma/client'

const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    regPets: [Pet!]!
  }

  type Mutation {
    postCreatePet(name: String!, breed: String!,sex: String!): Pet!
    postUpdatePet(id: Int!,name: String, breed: String,sex: String): Pet!
    postDeletePet(id: Int!): Pet!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    breed: String!
    sex: String!
  } 
`
type Pet = {
    id: string
    createdAt: string
    name: string
    breed: string
    sex: string
} 
  
// 2
const pets: Pet[] = []
  
const resolvers = {
Query: {
    info: () => `The goal is to create a one-stop solution for pet owners to identify 
    and register their pets within a global pet database, help return lost
    pets to their homes, organize travel, save pet documents and maintain
    health records, schedule vet visits, communicate, order favorite pet
    munchies and more!`,
    // 3
    regPets: async (parent: unknown,
        args: {},
        context: GraphQLContext) => {
            return context.prisma.petAccounts.findMany()
        },
},
Mutation: {
    postCreatePet: async (
        parent: unknown,
        args: { name: string, breed: string, sex: string },
        context: GraphQLContext
    ) => {
        const newPet = await context.prisma.petAccounts.create({
         data:{
            name: args.name,
            breed: args.breed,
            sex: args.sex
         }   
        })

        return newPet
    },

    postUpdatePet: async (
      parent: unknown,
      args: { id:number, name: string, breed: string, sex: string },
      context: GraphQLContext
    ) => {
        const newPet = await context.prisma.petAccounts.update({
          where:{
            id: args.id
          },
          data:{
            name: args.name,
            breed: args.breed,
            sex: args.sex
          }   
        })
        return newPet
    },

    postDeletePet: async (
      parent: unknown,
      args: { id:number},
      context: GraphQLContext
    ) => {
        const deletedPet = await context.prisma.petAccounts.delete({
          where:{
            id: args.id
          } 
        })
        return deletedPet
    }
  }
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})