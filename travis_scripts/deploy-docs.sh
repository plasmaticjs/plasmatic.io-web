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

# Purge cloudflare!

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
     -H "X-Auth-Email: ${CLOUDFLARE_USER_EMAIL}" \
     -H "X-Auth-Key: ${CLOUDFLARE_API_KEY}" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
