function newSwitchSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.switch({ mutation_in: ['CREATED'], machine_in : args.machine }).node()
  }

function newFigureSubscribe(parent, args, context, info) {
return context.prisma.$subscribe.figure({ mutation_in: ['CREATED'], measurement_in : args.measurement }).node()
}
  
  const newSwitch = {
    subscribe: newSwitchSubscribe,
    resolve: payload => {
      return payload
    },
  }
  const newFigure = {
    subscribe: newFigureSubscribe,
    resolve: payload => {
      return payload
    },
  }
  
  module.exports = {
    newSwitch,
    newFigure
  }