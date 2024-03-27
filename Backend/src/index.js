import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running at port:${process.env.PORT}`);
    });

    app.on("error:", (error) => {
      throw error;
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
