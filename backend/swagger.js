const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || (process.env.NODE_ENV === 'dev' ? process.env.PORT_DEV : process.env.PORT_PROD);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Express API with Swagger documentation",
    },
    servers: [
      {
        url: `http://10.1.1.50:${port}/api`,
      },
    ],
  },
  apis: ["./src/router/*.js", './src/doc/*.js'], // shu yerda sizning route fayllaringiz manzili
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
