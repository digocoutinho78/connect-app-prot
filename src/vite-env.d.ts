/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOGIN_USER?: string;
  readonly VITE_LOGIN_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "figma:asset/*" {
  const src: string;
  export default src;
}
