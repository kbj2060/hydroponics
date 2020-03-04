function feed(parent, args, context, info) {
    return context.prisma.switches()
  }

function info(){
  return `this is hydroponics system!`
}

  module.exports = {
    feed,
    info
  }