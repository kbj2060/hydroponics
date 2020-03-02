const { prisma } = require('./graphql/src/generated/prisma-client')

async function main() {

  // Create a new link
  const newLink = await prisma.createLink({ 
    Switch : {
      switch : 'LED',
      status : true,
      user : 12,
      controller : 1,
    }
  })
  console.log(`Created new link: ${newLink.switch} (ID: ${newLink.id})`)

  // Read all links from the database and print them to the console
  const allLinks = await prisma.links()
  console.log(allLinks)
}

main().catch(e => console.error(e))