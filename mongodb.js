const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerJSDoc = YAML.load("./api.yaml");
const swaggerJSDoc = require("swagger-jsdoc");

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));
app.use(express.json());
var database;

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "LogRocket Express API with Swagger",
//       version: "1.0.6",
//       description:
//         "This is a simple CRUD API application made with Express and documented with Swagger",
//       license: {
//         name: "MIT",
//         url: "https://spdx.org/licenses/MIT.html",
//       },
//       contact: {
//         name: "LogRocket",
//         url: "https://logrocket.com",
//         email: "info@email.com",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:8080",
//       },
//     ],
//   },
//   apis: ["./mongodb/*.js"],
// };

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node js API Project",
      version: "1.0.6",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./mongodb.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

/**
 * @swagger
 * /:
 *  get:
 *    summary: This is swagger api
 *    description: Get all Employee by Email
 *    responses:
 *        200:
 *         description: Success
 */

app.get("/", (req, resp) => {
  resp.send("Welcome to mongodb Api");
});

/**
 * @swagger
 *  components:
 *      schemas:
 *          Book:
 *              type: object
 *              properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *
 */

/**
 * @swagger
 * /api/books:
 *  get:
 *    summary: This get all books from mongodb
 *    description: This get all books from mongodb
 *    responses:
 *      200:
 *        description: This get all books from mongodb
 *        content:
 *            application/json:
 *                schema:
 *                    type: array
 *                    items:
 *                      $ref: '#components/schemas/Book'
 */

app.get("/api/books", (req, resp) => {
  database
    .collection("books")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      resp.send(result);
    });
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *    summary: This get all books from mongodb
 *    description: This get all books from mongodb
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: This get all books from mongodb
 *        content:
 *            application/json:
 *                schema:
 *                    type: array
 *                    items:
 *                      $ref: '#components/schemas/Book'
 *
 */

app.get("/api/books/:id", (req, resp) => {
  database
    .collection("books")
    .find({ id: parseInt(req.params.id) })
    .toArray((err, result) => {
      if (err) throw err;
      resp.send(result);
    });
});

/**
 * @swagger
 * /api/books/addBook:
 *  post:
 *    summary: This get all books from mongodb
 *    description: This get all books from mongodb
 *    requestBody:
 *      required: true
 *      content:
 *            application/json:
 *                schema:
 *                  $ref: '#components/schemas/Book'
 *    responses:
 *      200:
 *        description: Added Successfully
 *
 */

app.post("/api/books/addBook", (req, resp) => {
  let res = database.collection("books").find({}).sort({ id: -1 }).limit(1);
  res.forEach((obj) => {
    if (obj) {
      let book = {
        id: obj.id + 1,
        title: req.body.name,
      };
      database.collection("books").insertOne(book, (err, result) => {
        if (err) resp.status(500).send(err);
        resp.send("Added Successfully");
      });
    }
  });
});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *    summary: This get all books from mongodb
 *    description: This get all books from mongodb
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *            application/json:
 *                schema:
 *                  $ref: '#components/schemas/Book'
 *    responses:
 *      200:
 *        description: Update successfully
 *        content:
 *            application/json:
 *                schema:
 *                    type: array
 *                    items:
 *                      $ref: '#components/schemas/Book'
 *
 */

app.put("/api/books/:id", (req, resp) => {
  let book = {
    id: parseInt(req.params.id),
    title: req.body.name,
  };
  database
    .collection("books")
    .updateOne(
      { id: parseInt(req.params.id) },
      { $set: book },
      (err, result) => {
        if (err) throw err;
        resp.send(book);
      }
    );
});

/**
 * @swagger
 * /api/books/{id}:
 *  delete:
 *    summary: This get all books from mongodb
 *    description: This get all books from mongodb
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Delete successfully
 */

app.delete("/api/books/:id", (req, resp) => {
  database
    .collection("books")
    .deleteOne({ id: parseInt(req.params.id) }, (err, result) => {
      if (err) throw err;
      resp.send("Book is deleted");
    });
});

app.listen(8080, () => {
  MongoClient.connect(
    "mongodb://localhost:27017/",
    { useNewUrlParser: true },
    (error, result) => {
      if (error) throw error;
      database = result.db("test");
      console.log("connection sucessfull");
    }
  );
});
