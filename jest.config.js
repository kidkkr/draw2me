module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@web/(.*)': ['<rootDir>/web/$1'],
  }
};