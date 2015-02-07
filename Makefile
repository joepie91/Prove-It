SRC = lib/index.js
SRC_OUT = bin/prove-it.js
SRC_OUT_MAP = bin/prove-it.map.js

TESTS = test/*Test.js
TESTS_OUT = test/run.js

build: 
	@NODE_ENV=test node \
		./node_modules/.bin/browserify \
			--standalone prove --debug $(SRC) | \
		./node_modules/.bin/exorcist \
			$(SRC_OUT_MAP) > $(SRC_OUT); \
		./node_modules/.bin/uglifyjs \
			$(SRC_OUT) --output $(SRC_OUT) --in-source-map $(SRC_OUT_MAP) \
			--compress unused=false,sequences,properties,dead_code,conditionals,comparisons,evaluate,booleans,loops,if_return,join_vars,cascade,drop_console,screw_ie8 \
			--mangle sort

build-browser: 
	@NODE_ENV=test node \
		./node_modules/.bin/browserify $(TESTS) --outfile $(TESTS_OUT)

test:
	@NODE_ENV=test node --debug \
		./node_modules/.bin/_mocha \
		--require should \
		$(TESTS) \
		--bail

test-cov:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report html \
		-- -u exports \
		--require should \
		$(TESTS) \
		--bail

test-travis:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		--require should \
		$(TESTS) \
		--bail

.PHONY: test
