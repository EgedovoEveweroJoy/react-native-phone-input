#!/bin/bash

# Use shx for file operations
npx shx rm -rf ./dist
npx shx mkdir dist && npx shx mkdir dist/resources && npx shx mkdir dist/resources/flags
npx shx cp -r ./src/resources/flags/images ./dist/resources/flags
npx shx mkdir dist/typings && npx shx cp -r ./src/typings ./dist

# Run TypeScript build
tsc
