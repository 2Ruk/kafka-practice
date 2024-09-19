import * as process from 'process';

/**
 * system environment를 기준으로 .env 파일을 선택합니다.
 * @param env
 */
const getEnvPath = (env: string) => {
  switch (env) {
    case 'development':
      return '.env.dev';
    case 'production':
      return '.env.prod';
    default:
      return '.env.local';
  }
};

export default {
  /**
   * path는 {@link ConfigModule}에서 사용됩니다.
   */
  path: getEnvPath(process.env.NODE_ENV),
};
