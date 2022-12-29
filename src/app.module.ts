import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
