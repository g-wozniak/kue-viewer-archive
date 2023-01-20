#!/bin/bash

# Copy assets from common package to build
cp -R node_modules/@kue-space/common/assets dist/.local

# Copy static assets
cp -R dist/assets dist/.local

# Launching webpack
yarn webpack --progress
