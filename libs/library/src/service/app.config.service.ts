import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigInterface } from '@app/library/config/interface/app.config.interface';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * env의 key에 대한 값을 가져옵니다. 없을 경우 undefined를 반환합니다.  \
   * 필요에 따라 {@link AppConfigInterface} 확장해서 사용해주세요.
   * @param key
   * @description AppConfigInterface의 Key에 대한 종속성을 가집니다. 이는 휴먼 Level의 string 입력을 방지하기 위함입니다.
   */
  get(key: keyof AppConfigInterface): string {
    return this.configService.get(key);
  }

  /**
   * env의 key에 대한 값을 가져옵니다. 없을 경우 에러를 발생시킵니다.
   * 필요에 따라 {@link AppConfigInterface} 확장해서 사용해주세요.
   * @param key
   * @description AppConfigInterface의 Key에 대한 종속성을 가집니다. 이는 휴먼 Level의 string 입력을 방지하기 위함입니다.
   */
  getOrThrow(key: keyof AppConfigInterface): string {
    const value = this.get(key);
    if (!value) throw new Error(`Missing required configuration: ${key}`);
    return value;
  }
}
