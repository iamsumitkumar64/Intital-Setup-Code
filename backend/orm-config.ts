import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions =
    (configService: ConfigService,): DataSourceOptions => (
        {
            type: (configService.get<string>('DB_POSTGRES_TYPE') as any) || 'postgres',
            host: configService.get<string>('DB_POSTGRES_HOST') || 'localhost',
            port: configService.get<number>('DB_POSTGRES_PORT') ? Number(configService.get('DB_POSTGRES_PORT')) : 5432,
            username: configService.get<string>('DB_POSTGRES_USERNAME') || 'postgres',
            password: configService.get<string>('DB_POSTGRES_PASSWORD') || '123',
            database: configService.get<string>('DB_POSTGRES_DATABASE') || 'db',
            entities: ['dist/domain/*/*.entity{.ts,.js}'],
            synchronize: false,
            migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
        }
    );

const dataSource = new DataSource(
    dataSourceOptions(new ConfigService()),
);

export { dataSource };