# Takasbank Internship Project

An example project of buying, selling and monitoring of the funds. The project is not related with the real work, it only offers a most basic functionality. This is also my first project using spring boot and React.js project, therefore there are many things that are fundamentally wrong about.

## Backend

There is nothing special about the backend part. It is a simple CRUD web server. It has authentication and authorization capabilities, but it is copied and pasted from [here](https://www.bezkoder.com/spring-boot-jwt-authentication/). I have used an older Java version to build the spring boot application first, to be able to run the application on the company computer. Just before making this repository public, I have upgraded the Java version to 20, and changed the database to PostgreSQL. Though, the Java code is not the ideal Java 20 code, it is only compatible with Java 20, nothing more.

## Frontend

The frontend part is somewhat special. I have tried some uncommon patterns in here. I have tried MVC pattern on some pages, that I did not feel like using multiple useEffects. Backend caller client codes are created automatically using [openapi-typescript-codegen](https://www.npmjs.com/package/@ciptex/openapi-typescript-codegen) from the swagger definition. There is a global toast module that I have created using bootstrap's toast component. Also, there are route authentication and authorization using [this](https://www.robinwieruch.de/react-router-authentication/) guide. I did not copy and paste this part, but I got the principal from that guide. And there are many more small things, good or bad...
