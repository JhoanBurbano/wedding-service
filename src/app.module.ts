import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FamiliesModule } from './families/families.module';
import { InvitesModule } from './invites/invites.module';
import { MiddlewareMiddleware } from './middleware/middleware.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from './s3/s3.service';
import { UtilsService } from './utils/utils.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb+srv://${config.get<string>(
          'MONGO.USER',
        )}:${config.get<string>(
          'MONGO.PASSWORD',
        )}@burbanocorp.91g2g.mongodb.net/${config.get<string>(
          'MONGO.DATABASE',
        )}?retryWrites=true&w=majority`,
        useNewUrlParser: true,
      }),
    }),
    InvitesModule,
    FamiliesModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service, UtilsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareMiddleware).forRoutes('');
  }
}
