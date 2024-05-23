<div align="center">

  ![prismarinetitle](https://github.com/Azalea-Essentials/PrismarineDB/assets/122332042/4d9f66c7-206f-4a72-b3f7-40b1b296875a)

  ![prismarinebg](https://github.com/Azalea-Essentials/PrismarineDB/assets/122332042/93478fd5-5446-4f9c-b3de-f4e99ebfd881)

</div

## About

PrismarineDB is a database designed to feel similar to [mongoose](https://npmjs.com/package/mongoose). Instead of being a key-value database like most MCBE databases, it uses documents like what MongoDB does.

## Usage

### Creating a table

```js
let table = prismarineDB.table("table")
```

### Inserting a document

```js
table.insertDocument({
  key1: "test"
})
```

### Finding a document

1. Find all documents matching a query
```js
let document = table.findDocuments({
  key: "value"
})
```

2. Find first document matching a query
```js
let document = table.findFirst({
  key: "value"
})
```

## Scripts using PrismarineDB
- [Azalea Essentials](https://github.com/Azalea-Essentials/Azalea) by [Ant767](https://github.com/Ant767)

Made by [Azalea-Essentials](https://github.com/Azalea-Essentials/)