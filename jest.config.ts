import type { Config } from "jest";
import nextJest from "next/jest.js";

// next/jest wires up SWC transforms, path aliases from tsconfig, and CSS/image module
// mocks, so none of that needs configuring by hand.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  coverageProvider: "v8",
};

export default createJestConfig(config);
