export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DB_NAME: string;
      DB_PATH: string;
    }
  }
}
