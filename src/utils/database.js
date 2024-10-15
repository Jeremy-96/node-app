import mongoose from "mongoose";

export const databaseConnection = (uri) => {
  try {
    mongoose.connect(uri);
    console.log("Successful connection to MongoDB !");
  } catch (error) {
    console.error(error);
    console.log("Failed connection to MongoDB !");
  }
};
