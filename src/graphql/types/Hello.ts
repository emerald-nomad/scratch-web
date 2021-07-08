import { extendType } from "nexus";

export const HelloQuery = extendType({
    type: "Query",
    definition(t) {
        t.string('hello', { resolve: () => 'hello world!' })
        
        t.string("goodbye", {resolve: () => 'goodbye'})
    },
})