module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    "^vue$": "vue/dist/vue.common.js"
  },
  moduleFileExtensions: [
    "js",
    "vue"
  ],
  reporters: [
    ['jest-simple-dot-reporter', {color: true}]
  ],
  testEnvironment: "node",
  setupFiles: [
    "<rootDir>/test/helpers.js"
  ],
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  verbose: true,
};
