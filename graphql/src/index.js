const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Setting = require('./resolvers/Setting')
const Switch = require('./resolvers/Switch')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
  Query,
  Mutation,
  Subscription, 
  User,
  Switch,
  Setting,
}
const server = new GraphQLServer({
  typeDefs: 'graphql/src/schema.graphql',
  resolvers,
  context: async request => {
    // console.log(request.request.headers.authorization)
    return({
    ...request,
    prisma,
  })},
})


server.start(() =>
console.log(`Server is running on http://localhost:4000`)
)
