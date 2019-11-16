const { GraphQLServer } = require('graphql-yoga')
const Binding = require('prisma-binding')
const { prisma } = require('./generated/prisma-client')
const resolvers = require('./resolvers')

const env = process.env
const endpoint = `${env.PRISMA_ENDPOINT}/${env.PRISMA_SERVICE}/${env.PRISMA_STAGE}`

const server = new GraphQLServer({
    typeDefs: `${__dirname}/schema.graphql`,
    resolvers,
    context: request =>({
        ...request,
        db: new Binding.Prisma({
            typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
            endpoint: process.env.PRISMA_ENDPOINT
        }),
        prisma 
    })
})

server.start().then(() => console.log('Servidor rodando na porta 4000'))