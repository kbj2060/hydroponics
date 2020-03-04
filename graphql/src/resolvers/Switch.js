function controledBy(parent, args, context) {
    return context.prisma.switch({ id: parent.id }).controledBy()
  }
  
  module.exports = {
    controledBy,
  }