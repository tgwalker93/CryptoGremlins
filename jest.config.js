module.exports = {
    moduleNameMapper: {
      "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": '<rootDir>/config/styleMock.js',
      '\\.(css|less)$': '<rootDir>/config/styleMock.js',
    },
    testEnvironment: "../test_env/custom-test-env.js"
  };