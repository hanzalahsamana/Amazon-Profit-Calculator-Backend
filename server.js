const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


app.options("*", cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("Oh, you found the server!");
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

module.exports = app;
