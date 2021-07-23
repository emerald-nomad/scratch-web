import { objectType, extendType, nonNull, stringArg, inputObjectType, arg,  } from 'nexus'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { SignUpError, SIGNUP_ERROR_CODE, ServerError } from 'graphql/errors';

const APP_SECRET = process.env.APP_SECRET as string;

const createToken = async (userId: string) => {
  const token = await sign({ userId }, APP_SECRET)

  return token
}

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.id("id", {description: "Unique identification", })
        t.nonNull.string("username", {description: "Username for user",})
    }
})

export const AuthPayload = objectType({
    name: "AuthPayload",
    definition(t) {
        t.nonNull.field("user", {type: "User"})
        t.nonNull.string("token")
    }
})

export const SignUpInput = inputObjectType({
    name: "SignUpInput",
    definition(t) {
        t.nonNull.string('username', {description: "Username for new user"})
        t.nonNull.string("password", {description: "Password for new user"})
        t.nonNull.string("confirmPassword", {description: "Confirm password for new user"})
    }
})

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field('users', {
            type: "User",
            async resolve(_, args, { User }) {
                return User.findAll()
            }
        })
    }
});

export const UserMutaion = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('signup', {
            type: "AuthPayload",
            args: {
                input: nonNull(arg({type: "SignUpInput"}))
            },
            async resolve(_, {input: {username, password, confirmPassword}}, { User }) {
                try {
                    const existingUser = await User.findByUsername(username)

                    if (existingUser) throw SignUpError({username: "Username already in use"});

                    if (password !== confirmPassword) throw SignUpError({confirmPassword: "Password fields do not match"})

                    const hashedPassword = await hash(password, 10)

                    const user = await User.create({username, password: hashedPassword});

                    const token = await createToken(user.id);

                    return {user, token}
                } catch (error) {
                    const {code} = error.extensions;
                    
                    if (code === SIGNUP_ERROR_CODE) {
                        throw error;
                    } else {
                        console.error(error)
                        throw ServerError()
                    }
                }
                
            }
        })
    }
})