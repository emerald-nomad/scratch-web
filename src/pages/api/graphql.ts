import { ApolloServer } from "apollo-server-micro";
import { MONGO_URL } from "lib";
import { connect } from "mongoose";
import { schema, createContext } from "../../graphql";

connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const server = new ApolloServer({
  schema,
  context: createContext,
  formatError: (err) => {
    // @ts-ignore
    const { code, exception, ...data } = err.extensions;

    return { message: err.message, code, data };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({
  path: "/api/graphql",
});
