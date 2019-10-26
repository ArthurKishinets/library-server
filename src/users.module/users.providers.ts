import { Connection } from 'typeorm';
import { Users } from './user.entity';
import constants from '../config';

export const UsersProviders = [
    {
        provide: constants.providers.USERS_REPOSITORY,
        useFactory: (connection: Connection) => connection.getRepository(Users),
        inject: [constants.providers.DATABASE_CONNECTION],
    },
];
