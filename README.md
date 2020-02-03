# Receeve code

## Requirements

* Serverless account (https://serverless.com)
* nodejs (v10)
* yarn

## Introduction

This solution uses Serverless framework to develop and deploy the lambdas and create the resources (SNS, etc)

Also the code is heavily based on Dependency Injection (IoC) pattern. I used `Inversify` library for that. (http://inversify.io/)

To see the cloudformation template -> run ``yarn package``

## Settings

copy `set_local_secrets.example.sh` to `set_local_secrets.sh` and add the configs there.

You have to set at least the *Mongo DB URI* and your *AWS credentials*. You need to use an AWS credentials that has enough permissions to create the required resources (Check the cloudformation file for that).

[Setup your AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

I wanted to keep it simple so I hardcoded some config in `serverless.yaml` (ex: SNS Topic name) but they can be easily moved to the config

You might need to update the first three lines in `serverless.yaml` with your own serverless application. You can create that from your Serverless account.
```bash
org: ahmedsaab
app: receeve
service: mailgun-lambdas
```

## How to use

#### Install Dependencies

```bash
$ yarn install
```

#### Test (Unit)

```bash
$ yarn test
```

#### Linter

Starting the linter:

```bash
$ yarn lint
```

#### Develop locally

Starting a local dev server and the endpoint:

```bash
$ yarn start
```


#### Deployment

Run the following to deploy to AWS:

```bash
$ yarn deploy
```
