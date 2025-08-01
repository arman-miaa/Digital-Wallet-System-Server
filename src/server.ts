/* eslint-disable no-console */
import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";

import { envVars } from "./app/config/env";




let server: Server;



const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("Connected to DB!!");

    server = app.listen(5000, () => {
      console.log(`Server is listening to port ${envVars.PORT} `, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();

})();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved .... Server shutting down..");
  if (server) {
    server.close(() => {
      process.exit(1);
    });

    process.exit(1);
  }
});
process.on("SIGINT", () => {
  console.log("SIGINT signal recieved .... Server shutting down..");
  if (server) {
    server.close(() => {
      process.exit(1);
    });

    process.exit(1);
  }
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection Detected.... Server shutting down..", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });

    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception Detected.... Server shutting down..", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });

    process.exit(1);
  }
});

