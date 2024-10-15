import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  content: String,
});

const BaseModel = mongoose.model("Test", schema);

export default BaseModel;
