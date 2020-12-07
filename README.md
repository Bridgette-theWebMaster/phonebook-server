# Moshi Moshi

## A modern phonebook

Create an account and manage contacts seamlessly. Search for connections via user id and add to your contact list.

#### Live Client

https://moshi-moshi.vercel.app/

#### Client Repo

https://github.com/Bridgette-theWebMaster/phonebook

## Tech

### Back end

- Node
- Express
- Postgresql
- AWS S3
- Multer

### Testing

- Mocha
- Chai
- Supertest

### Production

-Heroku deployment

## Authentication

| Method | Endpoint    | Usage               | Returns |
| ------ | ----------- | ------------------- | ------- |
| POST   | /auth/login | Authenticate a user | JWT     |

### `/auth/login`

#### POST

Endpoint for authenticating users

##### Request Body

| Type | Fields         | Description                                    |
| ---- | -------------- | ---------------------------------------------- |
| JSON | name, password | JSON containing a username and password string |

##### Responses

| Code | Description                                                    |
| ---- | -------------------------------------------------------------- |
| 200  | Receive JWT with authenticated user_name and id inside payload |
| 400  | Missing '{user_name OR password}' in request body              |
| 400  | Incorrect user_name or password                                |

### `/auth/verify`

#### POST

Endpoint for authorizing users

## User Registration

| Method | Endpoint       | Usage             | Returns     |
| ------ | -------------- | ----------------- | ----------- |
| POST   | /auth/register | Register new user | User Object |

### `/api/user`

#### POST

Endpoint for registering new users

##### Request Body

| Type | Fields                                             | Description                                                                    |
| ---- | -------------------------------------------------- | ------------------------------------------------------------------------------ |
| JSON | name, email, password, address, phone, city, state | JSON containing username, email, password, address, phone, city, state strings |

##### Responses

| Code | Description                                                            |
| ---- | ---------------------------------------------------------------------- |
| 201  | Respond with object containing user data                               |
| 400  | Missing '{user_name OR email OR password}' in request body             |
| 400  | Error response object containing a number of validation error messages |

### `/api/user/search/:id`

#### GET

Endpoint for searching for a user

##### Request Body

| Type | Fields | Description      |
| ---- | ------ | ---------------- |
| JSON | id     | searched user id |

##### Responses

| Code | Description                              |
| ---- | ---------------------------------------- |
| 201  | Respond with object containing user name |

| Method | Endpoint  | Usage          | Returns     |
| ------ | --------- | -------------- | ----------- |
| GET    | /api/user | Review account | User Object |

### `/api/user/:id`

#### GET

Endpoint for reviewing account info

##### Request Body

| Type | Fields   | Description             |
| ---- | -------- | ----------------------- |
| JSON | jwtToken | JSON containing user_id |

##### Responses

| Code | Description                              |
| ---- | ---------------------------------------- |
| 201  | Respond with object containing user name |

| Method | Endpoint  | Usage          | Returns     |
| ------ | --------- | -------------- | ----------- |
| GET    | /api/user | Review account | User Object |

### `/api/user/:id`

#### PATCH

Endpoint for updating user contact info

##### Request Body

| Type | Fields   | Description             |
| ---- | -------- | ----------------------- |
| JSON | jwtToken | JSON containing user_id |

##### Responses

| Code | Description                   |
| ---- | ----------------------------- |
| 201  | Respond with updated password |

### `/upload`

#### PUT

Endpoint for updating user photo

##### Request Body

| Type      | Fields   | Description                   |
| --------- | -------- | ----------------------------- |
| JSON      | jwtToken | JSON containing user_id       |
| data-type | image    | image file for user to upload |

##### Responses

| Code | Description                |
| ---- | -------------------------- |
| 201  | Respond with updated photo |

### `/api/contact/`

#### GET

Endpoint for all contacts belonging to a specific user

##### Request Body

| Type | Fields   | Description             |
| ---- | -------- | ----------------------- |
| JSON | jwtToken | JSON containing user_id |
| JSON | id       | searched contact id     |

##### Responses

| Code | Description                                 |
| ---- | ------------------------------------------- |
| 201  | Respond with object containing contact name |

| Method | Endpoint     | Usage                                     | Returns     |
| ------ | ------------ | ----------------------------------------- | ----------- |
| GET    | /api/contact | All contacts in databse belonging to user | User Object |

### `/api/contact/:id`

#### GET

Endpoint for reviewing contact matching id info

##### Request Body

| Type | Fields   | Description             |
| ---- | -------- | ----------------------- |
| JSON | jwtToken | JSON containing user_id |
| JSON | id       | searched contact id     |

##### Responses

| Code | Description                                 |
| ---- | ------------------------------------------- |
| 201  | Respond with object containing contact name |

| Method | Endpoint     | Usage          | Returns     |
| ------ | ------------ | -------------- | ----------- |
| GET    | /api/contact | Review contact | User Object |

### `/api/contact`

#### POST

Endpoint for registering new users

##### Request Body

| Type | Fields      | Description                             |
| ---- | ----------- | --------------------------------------- |
| JSON | name, email | JSON containing username, email strings |
| JSON | jwtToken    | JSON containing user_id                 |

##### Responses

| Code | Description                                                            |
| ---- | ---------------------------------------------------------------------- |
| 201  | Respond with object containing user data                               |
| 400  | Error response object containing a number of validation error messages |

### `/api/contact/:id`

#### DELETE

Endpoint for deleting contact account

##### Request Body

| Type | Fields   | Description             |
| ---- | -------- | ----------------------- |
| JSON | jwtToken | JSON containing user_id |
| JSON | id       | searched contact id     |

##### Responses

| Code | Description                  |
| ---- | ---------------------------- |
| 201  | Respond with account deleted |

### `/api/contact/:id`

#### PATCH

Endpoint for updating contact info

##### Request Body

| Type | Fields   | Description             |
| ---- | -------- | ----------------------- |
| JSON | jwtToken | JSON containing user_id |
| JSON | id       | searched contact id     |

##### Responses

| Code | Description                   |
| ---- | ----------------------------- |
| 201  | Respond with updated password |

### `/:id/upload`

#### PUT

Endpoint for updating contact photo

##### Request Body

| Type      | Fields   | Description                   |
| --------- | -------- | ----------------------------- |
| JSON      | jwtToken | JSON containing user_id       |
| JSON      | id       | searched contact id           |
| data-type | image    | image file for user to upload |

##### Responses

| Code | Description                |
| ---- | -------------------------- |
| 201  | Respond with updated photo |
