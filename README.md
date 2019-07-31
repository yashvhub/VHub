# VHub
VHub repository

## VHub REST API

Before running:

Edit backend/vhub/src/main/resources/application.properties

Change `[connection-url]` to your database connection url.

Change `[username]`, and `[password]` to their respective database credentials.

To run locally you can run from an IDE, or use

`mvn spring-boot:run` in /backend/vhub

## VHub Web App

Install node_modules by running
`yarn install` in /frontend

Then start the development server with
`yarn start` in /frontend
