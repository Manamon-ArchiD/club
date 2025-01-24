import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./swagger";
import express from "express";
import bodyParser from "body-parser";
import clubController from "./controllers/club.controller";

const app = express();
const port = 3000;

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const response = {
    message: "Hello World",
    date: new Date(),
  };

  res.send(response);
});

app.use("/club", clubController);

app.listen(port, () => {
  console.log("Server is running on port", port);
});

export default app;
