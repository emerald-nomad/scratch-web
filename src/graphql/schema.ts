import { makeSchema, fieldAuthorizePlugin } from "nexus";
import { join } from 'path'
import { AuthorizationError } from "./errors";
import * as types from './types'

export const schema = makeSchema({
  types,
  plugins: [
    fieldAuthorizePlugin({formatError: () => AuthorizationError()}),
  ],
  contextType: {                                    
    module: join(process.cwd(),"src", "graphql" ,"./context.ts"),        
    export: "Context",                             
  },
  outputs: {
    typegen: join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: join(process.cwd(), 'generated/schema.graphql'),
  }
});