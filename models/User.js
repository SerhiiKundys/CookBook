const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  login: { type: String, required: "true", unique: true },
  password: { type: String, required: "true" },
  recipes: [{ type: Types.ObjectId, ref: "Recipe" }],
});

module.exports = model("User", schema);
