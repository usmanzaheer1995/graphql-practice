import { ApolloServer } from "apollo-server";
import { makeSchema } from "nexus";

import author from "./author";
import books from "./books";
import { context } from "./context";

const schema = makeSchema({
  types: [
    ...author,
    ...books
  ],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/typings.ts',
  },
})

const server = new ApolloServer({
  schema,
  context,
  resolvers: {}
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});