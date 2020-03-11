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

async function getUserWithToken(parent, args, context) {
  const user = await context.prisma.authPayloads({ token: args.token });
  console.log(user);
  return user;
}

function allUsers(parent, args, context) {
  const userId = getUserId(context)
  console.log(userId)
  return userId;
}

  module.exports = {
    allUsers,
    getUserWithToken,
    switchFeed,
    figureFeed,
    info
  }