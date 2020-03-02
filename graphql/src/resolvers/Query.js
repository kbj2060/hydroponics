function feed(parent, args, context, info) {
    return context.prisma.users()
  }
  
  module.exports = {
    feed,
  }