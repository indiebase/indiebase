if (import.meta.env.VITE_MOCK === 'true') {
  await import('./user.mock');
}

export * from './request';
