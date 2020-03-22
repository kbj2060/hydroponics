function switches(parent, args, context) {
    return context.prisma.user({ id: parent.id }).switches()
  }

  module.exports = {
    switches,
  }