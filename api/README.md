# Timeless advisor API

## Table of Contents

- [Introduction](#introduction)
- [Instalation](#installation)
- [Usage](#usage)
- [Authentication and Authorization](#authentication-and-authorization)
- [Api end points](#api-end-points)
- [Testing](#testing)
- [Future features](#future-features)

## Introduction

Welcome to the Timeless Advisor API, this API serves as a backend to the Timeless advisor game, where you are an advisor for a historical figure, and need to give them advice through a series of events.

This API does not hold the logic of the game, but serves as a intermediary between the game and the database whilst also dealing with authentication and authorization.

## Installation

- Run `npm install`
- Create a `.env`file with the followin environment variables
  - PORT - This will be the port the api will be listening to
  - DB_URL - Used to connect to the production Postres database, used in `npm run test`
  - DB_TEST_URL - Used to connect to the testing Postres database
  - SALT_ROUNDS - `jsonwebtoken` encrypting salt rounds
  - SECRET_TOKEN - `jsonwebtoken` encrypting secret
- Initialize and populate database with `npm run setup-db`

## Usage

- In production environment run `node index.js`
- In development environments
  - run `npm run dev` to use nodemon
  - run `npm run test` to run tests, refer to [test setup](#testing) for more information

## Authentication and Authorization

This api uses `jwt tokens` to authenticate and authorize requests.

    A jwt token should be sent in the authorization header of all requests to routes marked as restricted

The `authenticator` middleware in the middleware stack of any route that requires `authentication`, this includes when accessing `users` data as well as updating it, and for the `submissions` routes

The `restrictTo` middleware is found in the middleware stack of any route that requires `authorization` limiting access to restricted user roles.

## API end points

### User routes

| Routes                | Method | Body                                  | Restricted      | Response                                                                  |
| --------------------- | ------ | ------------------------------------- | --------------- | ------------------------------------------------------------------------- |
| `/users/verify-token` | `GET`  | `{highscore:number}`                  | `Authenticated` | Returns a JSON with a valid boolean representing token validity           |
| `/users/signup`       | `POST` | `{username:string , password:string}` | `FALSE`         | Creates a new user and returns a jwt token                                |
| `/users/login`        | `POST` | `{username:string , password:string}` | `FALSE`         | Verifies login credentials and returns jwt if verification is successfull |
| `/users/stats`        | `POST` |                                       | `Authenticated` | Returns a JSON object with user highscore and their username              |
| `/users/highscore`    | `POST` | `{highscore:number}`                  | `Authenticated` | Returns a JSON with the updated highscore                                 |

---

### Questions routes

| Routes                | Method | Body | Restricted | Response                                                                        |
| --------------------- | ------ | ---- | ---------- | ------------------------------------------------------------------------------- |
| `/questions/:eventId` | `GET`  |      | `FALSE`    | Returns a JSON of the questions and its respective answers related to `eventId` |

---

### Events routes

| Routes                 | Method | Body | Restricted | Response                                                                |
| ---------------------- | ------ | ---- | ---------- | ----------------------------------------------------------------------- |
| `/events/:characterId` | `GET`  |      | `FALSE`    | Returns a JSON with an Array of all events related to the `characterId` |

---

### Characters routes

| Routes            | Method | Body | Restricted | Response                                                         |
| ----------------- | ------ | ---- | ---------- | ---------------------------------------------------------------- |
| `/characters/`    | `GET`  |      | `FALSE`    | Returns a JSON with an Array of all characters in the database   |
| `/characters/:id` | `GET`  |      | `FALSE`    | Returns a JSON object with the character with the specified `id` |

---

### Submissions routes

| Routes          | Method | Body                                    | Restricted                | Response                                                         |
| --------------- | ------ | --------------------------------------- | ------------------------- | ---------------------------------------------------------------- |
| `/submissions/` | `POST` | `{outcome:boolean, question_id:number}` | `Authenticated`           | Returns a JSON the newly created submission row                  |
| `/submissions/` | `GET`  |                                         | `Teacher and Admin users` | Returns a summary of the submission results ordered by question` |

---

## Testing

The api contains both unit (using `jest`) and integration testing (uing `supertest` to mock requests).

To setup testing follow the following steps:

- Run `npm run setup-test-db` - to populate the test database with mock values
- Run `npm run test` - Runs tests with a watchAll tag
- Run `npm run coverage` - to view test coverage with Jest

## Future Features

- Increase the playable characters
- Add multiple questions per event and randomize selected question
- Allow teachers to create "classrooms" and make submissions requests summarize a classroom's performance
