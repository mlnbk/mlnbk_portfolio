# API - Cosmic Code Showcase 🚀🌌🌟

This is the API for the Cosmic Code Showcase portfolio, built with NestJS. It is responsible for serving certain data required by the frontend.

## Installation

```bash
$ npm install
```

## Note on nestjs-github-activity package

The `nestjs-github-activity` package is sourced from GitHub.

You can find it [here](https://github.com/mlnbk/nestjs-github-activity).

After cloning the repository, it needs to be built using `npm run build`.

Once built, it can be locally linked to your project using `npm link` in the source app.

Then, navigate to the `api` directory of the this application where you want to use this package. Run `npm link nestjs-github-activity`.

This will create a symbolic link from the local `node_modules` folder to the global package.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
