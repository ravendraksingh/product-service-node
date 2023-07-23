const express = require("express");
const bodyParser = require("body-parser");
const config = require("app-config");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const routes = require("./src/app/routes");
const requestValidator = require("./src/app/validators/validateBody");
const customErrorHandler = require("./src/app/errors/customErrorHandler");

const app = express();
const port = 5000;

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
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware functions
// app.use(requestValidator);

app.use("/", routes);

// DB Connection
mongoose
  .connect(
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
