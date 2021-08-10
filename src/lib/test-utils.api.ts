import { ApolloServer, ServerInfo } from "apollo-server";
import getPort, { makeRange } from "get-port";
import { GraphQLClient } from "graphql-request";
import { fieldAuthorizePlugin, makeSchema } from "nexus";
import * as types from "graphql/types";
import { AuthorizationError } from "graphql/errors";

import { join } from "path";
import { mockAuthRepository, mockUserRepository } from "graphql/repositories";

const testServer = new ApolloServer({
  schema: makeSchema({
    types,
    plugins: [
      fieldAuthorizePlugin({ formatError: () => AuthorizationError() }),
    ],
    contextType: {
      module: join(process.cwd(), "src", "graphql", "./context.ts"),
      export: "Context",
    },
    outputs: {
      typegen: join(process.cwd(), "generated/nexus-typegen.ts"),
      schema: join(process.cwd(), "generated/schema.graphql"),
    },
  }),
  context: (ctx: any) => ({
    ...ctx,
    Auth: mockAuthRepository,
    User: mockUserRepository,
  }),
});

type TestContext = {
  client: GraphQLClient;
};

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;
  const graphqlCtx = graphqlTestContext();

  beforeEach(async () => {
    const client = await graphqlCtx.before();
    Object.assign(ctx, {
      client,
    });
  });

  afterEach(async () => {
    await graphqlCtx.after();
  });

  return ctx;
}

function graphqlTestContext() {
  let serverInstance: ServerInfo | null = null;

  return {
    async before() {
      const port = await getPort({ port: makeRange(4000, 6000) });

      serverInstance = await testServer.listen({ port });

      console.log;

      return new GraphQLClient(`http://localhost:${port}`);
    },
    async after() {
      serverInstance?.server.close();
    },
  };
}
