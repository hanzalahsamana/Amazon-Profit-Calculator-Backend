const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();

app.use(cors()); // Allow all origins
app.use(express.json());


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
