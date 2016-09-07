# Concat List Mockup

## Pre-requisites

To get started, you'll need to have the following requirements installed

- Git
- Node.js<sup>1</sup>
- npm
- The users-api running 

<sup>1</sup>See https://nodejs.org/

<sup>2</sup>See https://docs.mongodb.com/manual/administration/install-community/ for installation guides

before start configure the url of the backend (by default `http://localhost:8000/` you can update this on src/config/default.json or be setting the environment variable `API_URL`

  `export API=http://localhost:8000/ `

## Start webpack en dev mode
`npm run webpack`

## Start Node on dev mode using nodemon (To run the system in dev mode you need to run webpack in parallel in another console, see previous command)
`npm run start:dev`

## Build App for deployment
`npm run build`

## Start application after build
`npm start`
