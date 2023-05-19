# Account Management
Account management is an app used to Ease the on-boarding process of new users.
### GitHub repository link
[Repo](https://github.com/niyodusengaclement/account-management.git)


--------------------------------------------------------------------------

## Tools

### Language
```
Typescript
```
### Server Environment
```
 *NestJS* (NestJS is a framework for building efficient, scalable Node.js web applications. )
 ```
 ### Database
```
 PostgreSQL
```
 ### ORM
```
 Prisma
```
### Containerization
```
 Docker
```
### Testing Framework and Assertion library
```
 Jest
```
### Testing Framework and Assertion library
```
 Jest
```
### Continuous Integration
```
GitHub Actions
```
## Getting Started
Follow instructions below to have this project running in your local machine
### Prerequisites
You must have NodeJS, and NestJS installed
Clone this repository ```https://github.com/niyodusengaclement/account-management.git``` or download the zip file.

### Installing
After cloning this repository to your local machine, cd into its root directory using your terminal and run the following commands

```bash
$ yarn
```

Yarn will install all dependencies.
### Running the app locally with yarn

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
### Running the app locally with docker
```bash
# new docker version
$ docker compose up --build

# old docker version
$ docker-compose up --build
```


> If you need some env variables like SMS KEYS, NIDA API ... you can contact me clementmistico@gmail.com or +250780282575.
> For testing purpose 123456 is always valid OTP (to be removed in production mode), on either phone verification or transaction confirmation.


### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Author

- [NIYODUSENGA Clement](https://github.com/niyodusengaclement)
