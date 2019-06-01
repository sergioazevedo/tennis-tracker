module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  roots: [
    'app',
    'companion',
  ],
  testEnvironment: 'node',
  //https://kulshekhar.github.io/ts-jest/user/config/
  //this configuration allows us to use ts-jest to
  //handle js files
  preset: 'ts-jest/presets/js-with-ts',
}