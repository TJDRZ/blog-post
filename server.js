const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");

// Database
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

// Middleware
// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// HTTP request logger
app.use(morgan("tiny"));
// Routes
app.use("/api", routes);

// Use build folder in client folder
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server running on port ${PORT}`));
