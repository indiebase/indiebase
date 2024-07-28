import 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NEXT_PUBLIC_RELEASE_ENV:
        | 'development'
        | 'production'
        | 'beta'
        | 'canary';
    }
  }
}
