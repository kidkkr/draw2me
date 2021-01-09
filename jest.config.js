module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@components/(.*)': ['<rootDir>/components/$1'],
  },
}
