function subjects(parent, args, context) {
    return context.prisma.setting({ id: parent.id }).subjects()
}
function appliedBy(parent, args, context) {
    return context.prisma.setting({ id: parent.id }).appliedBy()
}

module.exports = {
    subjects,
    appliedBy
}