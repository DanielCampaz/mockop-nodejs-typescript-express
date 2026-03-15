const { pathsToModuleNameMapper } = require("ts-jest");
const { readFileSync } = require("fs");
const tsconfig = JSON.parse(readFileSync("./tsconfig.test.json", "utf-8"));
const { compilerOptions } = tsconfig;

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      useESM: true,
      diagnostics: false,
    }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // 👈 Resuelve imports sin extensión
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  },
};
