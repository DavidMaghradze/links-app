const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");

const routes = require("./routes/auth.routes");
const links = require("./routes/link.routes");
const redirect = require("./routes/redirect.routes");

const app = express();

app.use(express.json({ extended: true }));
app.use("/api/auth", routes);
app.use("/api/link", links);
app.use("/t", redirect);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const mongoUri = config.get("mongoUri");
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (error) {
    console.log("Server Error", error);
    process.exit(1);
  }
}

start();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
