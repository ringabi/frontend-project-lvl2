install:
	npm install

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npx -n --experimental-vm-modules jest --watch 

publish:
	npm publish --dry-run
