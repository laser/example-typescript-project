# Makefile for your project

# Positional arguments or environment variables
DEV_ENV :=
PALLETS := 10

.PHONY: compile fmt-all lint-all run-app setup test-unit

compile:
	@npx tsc

fmt-all:
	@echo "> formatting all TypeScript sources" >&2
	@npx prettier --write "./src/**/*.ts"
	@npx eslint --fix

lint-all:
	@echo "> Linting all TypeScript sources" >&2
	@npx eslint

run-app:
	@echo "> running the application using JIT TypeScript compilation" >&2
	@bash -c 'env $$(cat .env | xargs) npx node --require ts-node/register src/index.ts'

setup:
	@echo ">> creating .env file and running database migrations" >&2
	@cp -n .env.example .env || (echo ".env already exists; skipping")
	@brew install nvm || (echo "nvm already installed; skipping")
	@npm install

test-unit:
	@echo "> running unit tests" >&2
	@bash -c 'env $$(cat .env | xargs) npx node --require ts-node/register --test test/unit/**/*.test.ts'