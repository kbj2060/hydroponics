function figures(parent, args, context) {
    return context.prisma.figureFeed({ id: parent.id }).figures()
}

module.exports = {
    figures,
}