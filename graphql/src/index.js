const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
        info: () => `this is hydroponics system!`,
        feed: (root, args, context, info) => { // 수정
            return context.prisma.users()        // 수정
          },
    },
    Mutation: {
        post: (root, args, context) => {       // 수정
            return context.prisma.createUser({   // 수정
              name: args.name,                     // 수정
              password: args.password,     // 수정
            })                                   // 수정
          },
        }
}

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: {prisma}
  })


server.start(() => console.log(`Server is running on http://localhost:4000`))
