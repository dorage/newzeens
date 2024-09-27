declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      ADMIN_ID: string;
      ADMIN_PWD: string;
    }
  }
}

export default {};
