import { ApolloServer } from 'apollo-server-micro'
import { connect } from "mongoose"
import { schema, createContext } from '../../graphql'

connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });


const server = new ApolloServer({
    schema,
    context: createContext,
    formatError: (err) => {
        // @ts-ignore
        const { code, exception, ...data } = err.extensions;

        return { message: err.message, code, data }
    }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({
  path: '/api/graphql',
})