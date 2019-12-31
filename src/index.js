const {GraphQLServer } = require('graphql-yoga');

let links = [{
    id:'link-0',
    url:'www.howtographql.com',
    description:'Fullstact Tutorial for Graphql'

}]

//define graphql schema 
// const typeDefs = './src/schema.graphql'
//implementation of graphql schema

let idCount = links.length
const resolvers = {
    Query:{
        info:()=> `This is the API of a Hackernews Clone`,
        feed: ()=> links,
        link:(root, { id }) => links.find(link => link.id === id)
},
Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },

    updateLink: (root, args) => {
      let updatedLink;

      links = links.map(link => {
        if (link.id === args.id) {
          updatedLink = { ...link, ...args };
          return updatedLink;
        }
        return link;
      });

      return updatedLink;
    },

    deleteLink: (root, args) => {
      const removeIndex = links.findIndex(item => item.id === args.id);
      const removedLink = links[removeIndex];
      links.splice(removeIndex, 1);

      return removedLink;
    }
  }
};
// schema and resolvers are bundled and passed to GraphQLservers
const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
})

server.start(()=>console.log(`Server is running on http://localhost:4000`))


// graphql schema has three specail root types these are Query Mutation Subscribtion
// correspoding to three operation offered in graphql : queries mutation subscription
// defin the api operatons