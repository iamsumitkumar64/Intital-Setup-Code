import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

const options: DataSourceOptions = {
    type: (process.env.DB_POSTGRES_TYPE as any) || 'postgres',
    host: process.env.DB_POSTGRES_HOST || 'localhost',
    port: Number(process.env.DB_POSTGRES_PORT) || 5432,
    username: process.env.DB_POSTGRES_USERNAME || 'postgres',
    password: process.env.DB_POSTGRES_PASSWORD || '123',
    database: process.env.DB_POSTGRES_DATABASE || 'db',
    entities: ['dist/domain/*/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

export { dataSource, options };