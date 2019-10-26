import { createConnection } from 'typeorm';
// import { TypeOrmModule } from '@nestjs/typeorm';
import constants from '../config';
// import { join } from 'path';

export const databaseProviders = [
    {
        provide: constants.providers.DATABASE_CONNECTION,
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: constants.host,
            port: constants.port,
            username: constants.username,
            password: constants.password,
            database: constants.database,
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: true,
        }),
    },
];