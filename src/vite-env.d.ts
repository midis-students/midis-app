/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VK_APP_ID: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'eruda' {
  function init(): void;
  function add(args: unknown): void;
}
declare module 'eruda-code';
declare module 'eruda-dom';
