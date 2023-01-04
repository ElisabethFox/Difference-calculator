install:
		npm ci

publish:
		npm publish --dry-run

gendiff -h:
		node bin/gendiff.js -h

lint: 
		npx eslint .

fix:
		npx eslint --fix .

test: 
		npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest