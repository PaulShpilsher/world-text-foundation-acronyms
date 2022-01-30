# World Texting Foundation, also known as WTF

<p>
REST API Web Service for managing acronyms frequently used in texting.
</p>

## 📝 Table of Contents

- [About](#about)
- [Quick start](#quickstart)
- [API](#api)
- [Configuration](#config)

## About <a name = "about"></a>

Messaging acronyms are everywhere now. Do you know all of them?
This is a simple web service provices a simple way managing acronyms.
It is a Node.js service written in Typescript that uses MongoDB for data storage.

In non-production environments it will prepopulate fresh database with a few predefined
acronym definitins In this package 
Build a REST API for the World Texting Foundation, also known as WTF.

A sample JSON data file will be provided with a base set of acronym definitions.

We expect you to create a NodeJS server using modern best practices for API development.

### Prerequisites

  - Node.js (latest LTS version recommened)
  - Docker needs to be installed if you wish use MomgoDB in container.
  - Docker Compose to run the web service with MongoDB in Docker.
  - Postman or some other tool to play with the APIs.

## Quick start <a name = "quickstart"></a>

### Developer world
These simple instructions are the guide to get you up and running in no time.

First install packages:
```
  npm install
```

Start MongoDB server instance in a docker container :
```
  npm run mongo
```

Start web server:
```
  npm run dev
```

## Docker world

Run fully functioning service with the database in docker containers using docker compose:
```
docker-compose up --build
```

## 🎈 API <a name="api"></a>

### Get acronyms by *fuzzy* searching definitions
```
  GET /acronym?from=:fromlimit=:limit&search=:search
```
Query arguments:
- *:search* is a mandatory string what to search for (case insensitive)
- *:from* is a mandatory non-negative number for paging: how many results to skip
- *:limit* is a mandatory non-negative number for paging: maximum number of acronyms to return

Result is a JSON array of acronyms with definitions
```
  JSON:
  [
    {
      acronym: string
      definition: string
    },
    ...
  ]
```
Paging note: after getting a page of results if more data available the response header will contain an entry "next" with a path to the next page of results.
```
  GET /acronym?from=10limit=5&search=freack
  
  Response header (when more data available):
    next: /acronym?from=15limit=5&search=freack
```
- On success returns: HTTP Status 200 (OK)
- In case of missing or invalid query parameters returns: HTTP Status 400 (BAD_REQUEST)

Testing
```
curl --location --request GET 'http://localhost:4040/acronym?from=50&limit=10&search=one'
```


### Get acronym's definitions
```
  GET /acronym/:acronym
```
Query arguments:
- *:acronym* a mandatory string of an acronym (case insensitive)

Result is a JSON object of an acronym and its definition
```
  JSON:
    {
      acronym: string
      definition: string
    }
```
*Since the client alreany has the acronym, an agument could be made for retuning just the acronym's definition.  For consitency I decided returning the "whole" object across all GET verbs.*
- On success returns: HTTP Status 200 (OK)
- When acronym does not exist returns: HTTP Status 404 (NOT_FOUND)

Testing
```
curl --location --request GET 'http://localhost:4040/acronym/test99'
```


### Create new acronym with definition
```
  POST /acronym
  Header:
    Content-Type: application/json
  Body:
  {
    acronym: string
    definition: string
  }
```
- On success returns: HTTP Status 201 (CREATED)
- If acronym already exist returns: HTTP Status 409 (CONFLICT)
- If either acronym or definition is missing returns: HTTP Status 400 (BAD_REQUEST)

Testing
```
curl --location --request POST 'http://localhost:4040/acronym' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "acronym": "TEST99",
    "definition": "Test ninety nine"
}'
```


### Update acronym's definition</i>
```
  PUT /acronym/:acronym
  Header:
    Authorization: XXXXX
    Content-Type: application/json
  Body: {
    definition: string
  }
```
- On success returns: HTTP Status 204 (NO_CONTENT)
- On failure returns: HTTP Status 400 (BAD_REQUEST)
- On missing authorization header returns: HTTP Status 400 (UNAUTHORIZED)

Note: *This API uses an authorization header to ensure acronyms are protected.  Currently this implementation just checks for the presense of Authorization header. It does not validate the token.*

Testing
```
curl --location --request PUT 'http://localhost:4040/acronym/test99' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: auth-token' \
  --data-raw '{
    "definition": "Test ninety nine. Take 2"
}'
```


### Delete an acronym
```
  GET /acronym/:acronym
  Header:
    Authorization: XXXXX
```
Note: *This API uses an authorization header to ensure acronyms are protected.  Currently this implementation just checks for the presense of Authorization header. It does not validate the token.*

- On success returns: HTTP Status 204 (NO_CONTENT)
- On failure returns: HTTP Status 400 (BAD_REQUEST)
- On missing authorization header returns: HTTP Status 400 (UNAUTHORIZED)

Testing
```
curl --location --request DELETE 'http://localhost:4040/acronym/test99' \
  --header 'Authorization: auth-token'
```


## 🚀 Configuration <a name = "config"></a>

This web service uses [@node-config-ts](https://www.npmjs.com/package/node-config-ts) for configuration.
The config file is 
```
./config/default.json

{
  "port": 4040,
  "mongoUri": "mongodb://localhost:27017/acronyms",
  "seedFile": "./data/acronym.json"
}
```
You may change the values in that file. Also you can have settings applied based on a runtime environment.
Example:
set environment variable 
```
  NODE_ENV=production
```
then the service will use setting from *./config/env/production.json* config file.
```
  ./config/env/production.json
```
You can also use command line arguments to override settings.
```
  --port 5000
```

For full understanding of configuration features please refer to [@node-config-ts](https://www.npmjs.com/package/node-config-ts)  documentation

