#!/bin/bash

set -o errexit

# config
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

# build
yarn install
hexo generate

cp CNAME public/
cd public

git init
git add .
git commit -m "Deploy Documentation from Travis CI"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
