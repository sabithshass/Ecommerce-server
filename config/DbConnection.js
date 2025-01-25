const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    const uri = process.env.DB_URL;
    mongoose.set("strictQuery", false);
    mongoose
      .connect(
        uri,
        { dbName: process.env.DB_NAME },
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(async () => {
       
        console.log(
          `Connected to the database ${process.env.DB_NAME} `
        );
        console.log(
          `The DB Name Connected in Main Server is ${process.env.DB_NAME} \n`,
          `The DB URL Connected in Main Server is ${process.env.DB_URL} \n`,
          `The PORT Connected in Main Server is ${process.env.PORT} \n`
        );
      })
      .catch((err) => {
        console.error("Error connecting to the database:", err);
      });
  } catch (error) {
    console.log("Database connection error \n", error);
    return false;
  }
};
