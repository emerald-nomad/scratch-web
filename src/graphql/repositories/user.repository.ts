import { compare, hash } from 'bcryptjs'
import { IUser, User} from "../db"

export interface UserRepository {
    findAll: () => Promise<IUser[]>
    findByUsername: (username: string) => Promise<IUser | null>
    create: (args: {username: string, password: string}) => Promise<IUser>
}

export const userRepository: UserRepository = {
    findAll: async () => await User.find(),

    findByUsername: async (username) => await User.findOne({username}),

    create: async ({username, password}) => await User.create({username, password})
    
}