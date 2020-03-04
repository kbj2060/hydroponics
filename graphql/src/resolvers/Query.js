async function feed(parent, args, context, info) {
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
    orderBy: args.orderBy
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

function info(){
  return `this is hydroponics system!`
}

  module.exports = {
    feed,
    info
  }