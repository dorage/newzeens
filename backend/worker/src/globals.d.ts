declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_ID: string;
      ADMIN_PWD: string;
    }
  }
}

export default {};
