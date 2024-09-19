import { Module } from '@nestjs/common';
import { LibraryService } from '../service/library.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '@app/library/modules/app.config.module';
import { AppConfigService } from '@app/library/service/app.config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        uri: configService.get('DB_URL'),
      }),
    }),
  ],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
