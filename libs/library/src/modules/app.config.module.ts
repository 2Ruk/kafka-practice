import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import env from '@app/library/config/env.path';
import { AppConfigService } from '@app/library/service/app.config.service';

/**
 * APP Config는 전역으로 접근할 수 있게 설정합니다.
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [env.path],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
