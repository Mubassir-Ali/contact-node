const express = require("express");
const app = express();


const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const userRouter = require("./src/routes/userRoutes");
const bodyParser = require("body-parser");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/users", userRouter);

app.listen(parseInt(process.env.PORT), () => {
  console.log(`App running on port ${process.env.PORT}`);
});
