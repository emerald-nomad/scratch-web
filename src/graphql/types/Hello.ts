import { ApolloError } from "apollo-server-micro";
import { AuthenticationError, AuthorizationError } from "graphql/errors";
import { extendType } from "nexus";

export const HelloQuery = extendType({
    type: "Query",
    definition(t) {
        t.string('hello', { resolve: () => {
            throw AuthenticationError({testing: "testing"})
            return "Hello"
        } })
        
        t.string("goodbye", {resolve: () => 'goodbye'})
    },
})