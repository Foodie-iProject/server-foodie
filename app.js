if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mainRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
