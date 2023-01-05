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
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch:
	npx jest --watch

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --bail --coverage