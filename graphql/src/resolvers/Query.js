const { APP_SECRET, getUserId } = require('../utils')

async function switchFeed(parent, args, context, info) {
  user = await context.prisma.users();
  const where = args.filter ? {              
    OR: [                                    
      { machine_in : args.filter },
    ],                                       
  } : {}                          
  const switches = await context.prisma.switches({ 
    where,
    skip: args.skip,  
    first: args.first, 
    orderBy: args.orderBy,
    last : args.last
  })
  const count = await context.prisma
  .switchesConnection({              
    where,                        
  })                              
  .aggregate()                    
  .count() 

  return {
    switches,
    count,
  }
}

async function figureFeed(parent, args, context, info) {
  user = await context.prisma.users();
  const where = args.filter ? {              
    OR: [                                    
      { measurement_in : args.filter },
    ],                                       
  } : {}                                   
  const figures = await context.prisma.figures({ 
    where,
    skip: args.skip,  
    first: args.first, 
    orderBy: args.orderBy,
    last : args.last
  })
  const count = await context.prisma
  .figuresConnection({              
    where,                        
  })                              
  .aggregate()                    
  .count() 

  return {
    figures,
    count,
  }
}

function info(){
  return `this is hydroponics system!`
}

async function getSetting(parent, args, context) {
  return await context.prisma.settings({ 
    last : args.last
  })
}

async function getCurrentUser(parent, args, context) {
  const userId = getUserId(context)
  const user = await context.prisma.user({ id : userId })
  console.log(user)
  return user;
}

  module.exports = {
    getCurrentUser,
    switchFeed,
    figureFeed,
    info,
    getSetting
  }