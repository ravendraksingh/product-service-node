const express = require("express");
// const config = require("app-config");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const customErrorHandler = require("./src/errors/customErrorHandler");
const router = require("./src/routes/router");

const app = express();
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Optional: Configure cors to prevent unauthorised domain to access your resources
const allowlist = [
  "http://localhost:3080",
  "http://localhost:3090",
  "http://localhost:9000",
  "https://localhost:9443",
  "https://localhost:9444",
  "http://127.0.0.1:5500",
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  //   console.log("######## Origin", req.header("Origin"), req.originalUrl);
  let isDomainAllowed = allowlist.indexOf(req.header("Origin")) !== -1;
  if (isDomainAllowed) {
    // Enable CORS for this request
    corsOptions = {
      origin: true,
      //   methods: "GET,POST, PUT",
      //   allowedHeaders:
      // "api-key, api-client-name, Access-Control-Allow-Origin, WWW-Authenticate",
      //   credentials: false,
      //   preflightContinue: false,
      //   optionsSuccessStatus: 200,
    };
  } else {
    // Disable CORS for this request
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
// Optional: To add additional security to protect your HTTP headers in response.
// app.use(helmet());

// Custom middleware functions
// app.use(requestValidator);

app.use("/", router);

// DB Connection
mongoose
  .connect(
    // "mongodb+srv://ravendraaws01:d31yWelFrnh6dUNX@cluster0.m0kbdbr.mongodb.net/product-catalog?retryWrites=true&w=majority&appName=AtlasApp",
    "mongodb://127.0.0.1:27017/test",
    { useNewUrlParser: true }
    // config.db.url, // refer to the config/dev/db.js file
    // {
    //   useCreateIndex: true,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => console.log("DB connected successfully."))
  .catch((err) => console.log("DB connection failed " + err));

// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   res.status(500).send("Something broke!");
// });

// Custom error handler
app.use(customErrorHandler);

//Any url that doesn't match will return as a 404
app.use(function (req, res, next) {
  //   console.log(req);
  const err = new Error("Not Found");
  res.status(404).send({
    status: "error",
    message: "Service Not Found 404",
  });
  err.status = 404;
  next(err);
});

const server = app.listen(port, () =>
  console.log("Server is up and running at port: " + port)
);
