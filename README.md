# VHub
VHub repository

## VHub REST API

### Before running:

Edit backend/vhub/src/main/resources/application.properties

Change `[connection-url]` to your database connection url.

Change `[username]`, and `[password]` to their respective database credentials.

### Lombok

This project uses Lombok, which will require additional set up.

For Eclipse run the lombok jar which will run an installer.

For IntelliJ add the Lombok plugin and enable Annotation Processing.
  `> Settings > Build, Execution, Deployment > Compiler > Annotation Processors`

### Run locally:

To run locally you can run from an IDE, or use

`mvn spring-boot:run` in /backend/vhub

In Eclipse run as Spring Boot App.

## VHub Web App

Install node_modules by running
`yarn install` in /frontend

Then start the development server with
`yarn start` in /frontend
