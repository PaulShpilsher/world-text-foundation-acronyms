# World Texting Foundation, also known as WTF

<p>
REST API Web Service for managing acronyms frequently used in texting.
</p>

## 📝 Table of Contents

- [About](#about)
- [API](#api)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

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

```
Give examples
```

### Installing

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

## 🎈 API <a name="api"></a>

###### POST <i>adds new acronym and definition</i>
```
  POST
    /acronym
  Header:
    Content-Type: application/json
  Body: {
    acronym: string
    definition: string
  }
```
- On success returns: HTTP Status 201 (CREATED)
- If acronym already exist returns: HTTP Status 409 (CONFLICT)
- If either acronym or definition is missing returns: HTTP Status 400 (BAD_REQUEST)


###### PUT <i>updates existing acronym definition</i>
```
  PUT
    /acronym/:acronym
  Header:
    Authorization: XXXXX
    Content-Type: application/json
  Body: {
    definition: string
  }
```
- On success returns: HTTP Status 204 (NO_CONTENT)
- Otherwise returns: HTTP Status 400 (BAD_REQUEST)

Note: *This API uses an authorization header to ensure acronyms are protected.  Currently this implementation just checks for the presense of Authorization header. It does not validate the token.*




## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
