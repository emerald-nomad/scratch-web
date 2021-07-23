import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { APP_SECRET } from 'graphql/utils';
import { User } from 'graphql/db';

export interface AuthRepository {
    isAuthenticated: (req: Request) => Promise<boolean>
    isDeveloper: (req: Request) => Promise<boolean>
}


const getUser = async (
    req: Request
): Promise<{ userId: string; token: string }> => {
    const { authorization } = req.headers

    if (!authorization) throw Error()

    const token = authorization!.replace('Bearer ', '')

    try {
        const { userId } = (await verify(token, APP_SECRET)) as { userId: string }

        return { userId, token }
    } catch (error) {
        throw Error()
    }
}

export const authRepository: AuthRepository = {
    isAuthenticated: async (req) => {
        const user = await getUser(req)

        req.body = {
            ...req.body,
            ...user
        }

        return true
    },

    isDeveloper: async (req) => {
        const { userId } = await getUser(req)

        const user = await User.findById(userId)

        if (!user || user.role !== 'DEVELOPER') throw Error()

        req.body = {
            ...req.body,
            ...user
        }

        return true
    }
}