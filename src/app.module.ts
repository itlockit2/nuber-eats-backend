import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restuarant } from './restaurants/entities/restaurants.entity';

const IS_DEV = process.env.NODE_ENV === 'dev';
const IS_PROD = process.env.NODE_ENV === 'prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: IS_DEV ? '.env.dev' : '.env.test',
      ignoreEnvFile: IS_PROD,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        POSTDB_HOST: Joi.string().required(),
        POSTDB_PORT: Joi.string().required(),
        POSTDB_USERNAME: Joi.string().required(),
        POSTDB_PASSWORD: Joi.string().required(),
        POSTDB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTDB_HOST,
      port: +process.env.POSTDB_PORT,
      username: process.env.POSTDB_USERNAME,
      password: process.env.POSTDB_PASSWORD,
      database: process.env.POSTDB_NAME,
      synchronize: IS_DEV,
      logging: IS_DEV,
      entities: [Restuarant],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
