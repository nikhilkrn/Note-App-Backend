# Javascript Note App

A note app made in Javascript using express-js as http server and mongodb as database. Api routes are live feel free to try out.
<br>

LINK  TO WEBSITE : [it's Live Here](https://routes.noteapp.nikhillkarn.com.np/)

## Setup

to get this repository, run this command in your terminal

```bash
$git clone https://github.com/nikhilkrn/Note-App-Backend.git
```

to run this you will node js installed in your system. you can download it from [https://nodejs.org/en/download](https://nodejs.org/en/download)

once you have downloaded node-js, open cloned repo in your IDE or code editor and run the command

```bash
$npm install
```

create a **.env** file and add your follwing data in file:

 - ACCESS_TOKEN_SECRET 
 - ACCESS_TOKEN_EXPIRY
 - PORT
 - MONGOOSE_URL
---

now run

```bash
$node index.js

```

once your server is hosted, go to [http://localhost:3000/users/signup](http://localhost:3000/users/signup)  
and sign up user as per [here](#POST-Signup)

Feel free to change or add data in db and use. Happy coding :)

# Authentication

# Users

## POST Signup

POST /signup

> Body Parameters

```json
{
  "username": "test1",
  "password": "12345",
  "email": "hello1@test.com"
}
```

### Params

| Name       | Location | Type   | Required | Description |
| ---------- | -------- | ------ | -------- | ----------- |
| body       | body     | object | no       | none        |
| » username | body     | string | yes      | none        |
| » password | body     | string | yes      | none        |
| » email    | body     | string | yes      | none        |

> Response Examples

```json
{
  "data": "User Created successfully",
  "msg": {
    "username": "test1",
    "password": "$2b$10$nt49U4x8mIkc88U8AbFxpOmORTVMwLcLM50PxHzdI2fzHRqRxrDca",
    "email": "hello1@test.com",
    "_id": "6784e36d85260f900e739af5",
    "__v": 0
  },
  "statuscode": 200,
  "success": true
}
```

```json
{
  "statuscode": 403,
  "msg": "User Already Exists",
  "errors": [],
  "success": false,
  "data": null
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## POST signin

POST /signin

> Body Parameters

```json
{
  "username": "test1",
  "password": "12345"
}
```

### Params

| Name       | Location | Type   | Required | Description |
| ---------- | -------- | ------ | -------- | ----------- |
| body       | body     | object | no       | none        |
| » username | body     | string | yes      | none        |
| » password | body     | string | yes      | none        |

> Response Examples

```json
{
  "data": {
    "user": {
      "_id": "6784e36d85260f900e739af5",
      "username": "test1",
      "email": "hello1@test.com",
      "__v": 0
    },
    "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODRlMzZkODUyNjBmOTAwZTczOWFmNSIsInVzZXJuYW1lIjoidGVzdDEiLCJlbWFpbCI6ImhlbGxvMUB0ZXN0LmNvbSIsImlhdCI6MTczNjc2MjI0OCwiZXhwIjoxNzM3NjI2MjQ4fQ.qAQaawINuFFLj_JYaMuMiJtn-wetEWNTU_tsymcng8I"
  },
  "msg": "loggedin successfully",
  "statuscode": 200,
  "success": true
}
```

```json
{
  "statuscode": 403,
  "msg": "user not found",
  "errors": [],
  "success": false,
  "data": null
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## POST signout

POST /signout

> Body Parameters

```json
{}
```

### Params

| Name | Location | Type   | Required | Description |
| ---- | -------- | ------ | -------- | ----------- |
| body | body     | object | no       | none        |

> Response Examples

```json
{
  "data": {
    "user": "User Logged Out"
  },
  "msg": "logged Out successfully",
  "statuscode": 200,
  "success": true
}
```

```json
{
  "statuscode": 403,
  "msg": "Unauthorized request",
  "errors": [],
  "success": false,
  "data": null
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

# Notes

## POST Add Note

POST /addnote

> Body Parameters

```json
{
  "title": "first Note",
  "description": "first note added"
}
```

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| body          | body     | object | no       | none        |
| » title       | body     | string | yes      | none        |
| » description | body     | string | yes      | none        |

> Response Examples

```json
{
  "data": {
    "data": {
      "title": "first Note",
      "description": "first note added",
      "createdBy": "test1",
      "_id": "6784e39685260f900e739b04",
      "createdAt": "2025-01-13T09:57:42.763Z",
      "updatedAt": "2025-01-13T09:57:42.763Z",
      "__v": 0
    }
  },
  "msg": "Note Added Successully",
  "statuscode": 201,
  "success": true
}
```

```json
{
  "statuscode": 403,
  "msg": "Task already present",
  "errors": [],
  "success": false,
  "data": null
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## PUT Update Note

PUT /updatenote/6784e39685260f900e739b04

> copy id from \_id from db and paste insted of 678405d71b160d180218a310 which is params

> Body Parameters

```json
{
  "title": "first Note",
  "description": "first note added"
}
```

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| body          | body     | object | no       | none        |
| » title       | body     | string | yes      | none        |
| » description | body     | string | yes      | none        |

> Response Examples

```json
{
  "data": {
    "title": "first Note",
    "description": "first note added"
  },
  "msg": "Task Updated Successfullt",
  "statuscode": 201,
  "success": true
}
```

```json
{
  "statuscode": 403,
  "msg": "Note Not Found",
  "errors": [],
  "success": false,
  "data": null
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## GET Get All Note

GET /getnotes

> Response Examples

```json
{
  "data": {
    "Notes": [
      [
        "Title: first Note",
        "Description: first note added",
        "Created By: test1"
      ]
    ]
  },
  "msg": "Fetched All Todos",
  "statuscode": 200,
  "success": true
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## DELETE Delete Note

DELETE /delete

> Body Parameters

```json
{
  "title": "first Note",
  "_id": "6784e39685260f900e739b04"
}
```

### Params

| Name    | Location | Type   | Required | Description |
| ------- | -------- | ------ | -------- | ----------- |
| body    | body     | object | no       | none        |
| » title | body     | string | yes      | none        |
| » \_id  | body     | string | yes      | none        |

> Response Examples

```json
{
  "data": {
    "_id": "6784e39685260f900e739b04",
    "title": "first Note",
    "description": "first note added",
    "createdBy": "test1",
    "createdAt": "2025-01-13T09:57:42.763Z",
    "updatedAt": "2025-01-13T09:58:18.651Z",
    "__v": 0
  },
  "msg": "Note Deleted",
  "statuscode": 200,
  "success": true
}
```

```json
{
  "statuscode": 403,
  "msg": "Something went wrong",
  "errors": [],
  "success": false,
  "data": null
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

# Data Schema

<h2 id="tocS_Pet">Pet</h2>

<a id="schemapet"></a>
<a id="schema_Pet"></a>
<a id="tocSpet"></a>
<a id="tocspet"></a>

```json
{
  "id": 1,
  "category": {
    "id": 1,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": ["string"],
  "tags": [
    {
      "id": 1,
      "name": "string"
    }
  ],
  "status": "available"
}
```

### Attribute

| Name      | Type                        | Required | Restrictions | Title | Description      |
| --------- | --------------------------- | -------- | ------------ | ----- | ---------------- |
| id        | integer(int64)              | true     | none         |       | Pet ID           |
| category  | [Category](#schemacategory) | true     | none         |       | group            |
| name      | string                      | true     | none         |       | name             |
| photoUrls | [string]                    | true     | none         |       | image URL        |
| tags      | [[Tag](#schematag)]         | true     | none         |       | tag              |
| status    | string                      | true     | none         |       | Pet Sales Status |

#### Enum

| Name   | Value     |
| ------ | --------- |
| status | available |
| status | pending   |
| status | sold      |

<h2 id="tocS_Category">Category</h2>

<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "id": 1,
  "name": "string"
}
```

### Attribute

| Name | Type           | Required | Restrictions | Title | Description   |
| ---- | -------------- | -------- | ------------ | ----- | ------------- |
| id   | integer(int64) | false    | none         |       | Category ID   |
| name | string         | false    | none         |       | Category Name |

<h2 id="tocS_Tag">Tag</h2>

<a id="schematag"></a>
<a id="schema_Tag"></a>
<a id="tocStag"></a>
<a id="tocstag"></a>

```json
{
  "id": 1,
  "name": "string"
}
```

### Attribute

| Name | Type           | Required | Restrictions | Title | Description |
| ---- | -------------- | -------- | ------------ | ----- | ----------- |
| id   | integer(int64) | false    | none         |       | Tag ID      |
| name | string         | false    | none         |       | Tag Name    |
