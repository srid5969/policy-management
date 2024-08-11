import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configs } from './configs/app';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPolicyModule } from './user-policy/user-policy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>('dbURI')}/${configService.get<string>(
          'database',
        )}`,
      }),
      inject: [ConfigService],
    }),
    UserPolicyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
