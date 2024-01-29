import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';

import { GithubActivityModule } from 'nestjs-github-activity';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({ ttl: 10 * 60 * 1000 }), // 10 minutes
    ConfigModule.forRoot({ isGlobal: true }),
    GithubActivityModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        userName: 'mlnbk',
        githubPersonalAccessToken: configService.get(
          'GH_PERSONAL_ACCESS_TOKEN',
        ),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
