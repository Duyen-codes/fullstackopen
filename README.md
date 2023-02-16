# Fullstackopen2022 course by University of Helsinki



## Part 8: GraphQL

- replace Apollo Server with Apollo Server Express, install following libraries

```shell
npm install apollo-server-express apollo-server-core express @graphql-tools/schema
```

## Part 9: TypeScript

### Setup

- install both ts-node package and the official typescript package globally by running:

```shell
npm install -g ts-node typescript
```

- or create an npm project and install the dependencies by running

```shell
npm install --save-dev ts-node typescript
```

### 9c Setting up the project

run npm init and install typescript package as a dev dep

```shell
npm install typescript --save-dev
```

TypeScript's Native Compiler(tsc), npm script for running tsc is as follows:

```shell
{
    //...
    "script": {
        "tsc": "tsc"
    },
    //...
}
```

initialize tsconfig.json settings by running:

```shell
npm run tsc -- --init
```

doublecheck that everything really works by running the compiler and the eslint from the command line with commands:

```shell
npm run tsc
npm run lint
```
## Part13

### part 13a
- Create database table automatically for model Note
```shell
Note.sync()
```