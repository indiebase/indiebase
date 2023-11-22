module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['<rootDir>', '<rootDir>/first_party/*', 'community'],
};
