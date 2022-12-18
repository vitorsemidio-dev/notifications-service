import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s', '!<rootDir>/src/infra/**'],
  coverageDirectory: './coverage/unit',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default jestConfig;
