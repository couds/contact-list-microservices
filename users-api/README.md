# Users API

This sample project will give you a minimal users RESTful API to build your contact list template against. It only implements user listing and reading - feel free to add other actions (e.g. update, delete, create) as you see fit. It is built using JavaScript/Node.js (our language of choice), ExpressJS (a small, lightweight web MVC framework) & Mongoose (a MongoDB object modelling library).

## Pre-requisites

To get started, you'll need to have the following requirements installed

- Git
- Node.js<sup>1</sup>
- npm
- MongoDB 2.6.x / 3.2.x<sup>2</sup>

<sup>1</sup>See https://nodejs.org/

<sup>2</sup>See https://docs.mongodb.com/manual/administration/install-community/ for installation guides

## Getting started
	
	# Ensure `mongod` is running, either as a service or in another shell
	git clone <this repo>
	npm install
	npm run-script seed # Seed the DB with Users
	# To start in dev mode
	npm run start:dev

## Running tests

`npm test`

## API documentation

See http://localhost:8000/docs for the API Docs.

## To Deploy

	npm install
	npm run-script seed # Seed the DB with Users
	npm run build
	npm run start

## SonarQube
In addition to ESLint, we've also included some configuration for SonarQube in `sonar-project.properties`.

See http://docs.sonarqube.org/display/SONAR/Get+Started+in+Two+Minutes for more details on how to setup SonarQube locally.
