module.exports = {
    clearMocks: true,
    roots: [
        '<rootDir>/tests'
    ],
    moduleNameMapper: {
        "@models/(.*)": "<rootDir>/src/models/$1",
        "@controllers/(.*)": "<rootDir>/src/controllers/$1",
        "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
        "@shared/(.*)": "<rootDir>/src/shared/$1",
        "@services/(.*)": "<rootDir>/src/services/$1",
        "@environments/(.*)": "<rootDir>/environments/$1",
      },
    testEnvironment: 'node',
    preset: 'ts-jest',
};