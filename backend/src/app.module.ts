import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSource } from './infrastructure/database/orm-config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/repository/user-repository/user-repository';
import { AuthenticateMiddleware } from './infrastructure/middleware/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SocketModule } from './infrastructure/socket/socket.module';
import { AuthModule } from './feature/auth/auth.module';
import { DataSourceOptions } from 'typeorm';
import { UploadModule } from './feature/upload/upload.module';
import { createTransactionalDataSourceService } from './infrastructure/service/typeorm-transactional/typeorm-transactional.service';
import { BcryptService } from './infrastructure/service/bcrypt/bcrypt.service';
import { JwtHelperService } from './infrastructure/service/jwt/jwt.service';
import { CloudinaryService } from './infrastructure/service/cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...dataSource.options,
        retryAttempts: Number(configService.get('DB_RETRY_ATTEMPTS')) || 10,
        retryDelay: Number(configService.get('DB_RETRY_DELAY')) || 5000,
      }),
      dataSourceFactory: async (options) =>
        createTransactionalDataSourceService(
          options as DataSourceOptions,
        ),
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_REGISTER_SECRET'),
      }),
      global: true,
    }),

    //Modules
    AuthModule,
    SocketModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BcryptService,
    UserRepository,
    JwtHelperService,
    CloudinaryService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'auth/register', method: RequestMethod.ALL },
        { path: 'auth/logout', method: RequestMethod.ALL },
        { path: 'upload/signed-url', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
