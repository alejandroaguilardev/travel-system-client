// jest.config.js
export default {
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/cypress/"
    ],
};
