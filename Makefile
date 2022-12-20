install:
		npm ci

publish:
		npm publish --dry-run

gendiff -h:
		node bin/gendiff.js -h

gendiff:
		node bin/gendiff.js