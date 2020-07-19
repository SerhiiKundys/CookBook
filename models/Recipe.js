const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String, required: "true" },
    description: { type: String, required: "true" },
    date: { type: Date, default: Date.now },
    owner: { type: Types.ObjectId, ref: "User" },
    prevVersion: { type: Types.ObjectId, ref: "Recipe", default: null },
    nextVersion: { type: Types.ObjectId, ref: "Recipe", default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recipe", schema);
