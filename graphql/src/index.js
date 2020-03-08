const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Switch = require('./resolvers/Switch')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
  Query,
  Mutation,
  Subscription, 
  User,
  Switch
}

const server = new GraphQLServer({
  typeDefs: './graphql/src/schema.graphql',
  resolvers,
  context: ({ req }) => {
    if (!req.headers.authorization)
      throw new Error("mssing token");

    const token = req.headers.authorization;
    const user = users.find(user => user.token === token);
    if (!user) throw new Error("invalid token");
    return { 
      ...req,
      prisma,
      user,
      };
  },
})


server.start(() =>
console.log(`Server is running on http://localhost:4000`)
)
