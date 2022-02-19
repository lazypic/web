#!/bin/sh
aws s3 sync . s3://lazypic.org --acl public-read --profile lazypic --exclude '.git/*'
