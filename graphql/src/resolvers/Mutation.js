const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({ ...args, password })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
      token,
      user,
    }
  }
  
async function login(parent, args, context, info) {
  const user = await context.prisma.user({ name: args.name })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}

async function switchControl(parent, args, context, info) {
  const userId = getUserId(context);
  const newSwitch = await context.prisma.createSwitch({
    machine: args.machine,
    status: args.status,
    controledBy: { connect: { id: userId } },
  })
  return newSwitch;
}

async function measure(parent, args, context, info) {
  const newFigure = await context.prisma.createFigure({
    value: args.value,
    measurement: args.measurement
  })
  return newFigure;
}

async function setting(parent, args, context, info) {
  console.log(args)
  const userId = getUserId(context);
  const newSetting = await context.prisma.createSetting({
    appliedBy : { connect: { id: userId } },
    subjects: { create: [{  measurement: args.measurement[0], 
                            start: args.start[0], 
                            end: args.end[0] },
                          {  measurement: args.measurement[1], 
                            start: args.start[1], 
                            end: args.end[1] },
                          {  measurement: args.measurement[2], 
                            start: args.start[2], 
                            end: args.end[2] },
                          {  measurement: args.measurement[3], 
                            start: args.start[3], 
                            end: args.end[3] },
                          {  measurement: args.measurement[4], 
                            start: args.start[4], 
                            end: args.end[4] },
                          {  measurement: args.measurement[5], 
                            start: args.start[5], 
                            end: args.end[5] },
                                    ]}
  })
  return newSetting;
}

module.exports = {
  signup,
  login,
  switchControl,
  measure,
  setting
}
