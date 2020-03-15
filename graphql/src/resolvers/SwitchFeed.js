function switches(parent, args, context) {
    return context.prisma.switchFeed({ id: parent.id }).switches()
}

module.exports = {
    switches,
}