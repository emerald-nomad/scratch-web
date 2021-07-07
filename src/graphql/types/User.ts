import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus'

export const User = objectType({
    name: "User",
    definition(t) {
        t.id("id")
        t.string("name")
        t.string("email")
    }
})

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field('users', {
            type: "User",
            resolve(_, args, ctx) {
                return ctx.db.User.find()

            }
        })
    }
});

// export const UserMutation = extendType({
//     type: "Mutation",
//     definition(t) {
//         t.field('signup', {
//             type: 'User',
//             args: {
//                 name: nonNull(stringArg()),
//                 email: nonNull(stringArg({ description: "Email address for new user" })),
//                 password: nonNull(stringArg({ description: "" }))
//             }
//             resolve(_, args, ctx) {

//             }
//         })
//     }
// })