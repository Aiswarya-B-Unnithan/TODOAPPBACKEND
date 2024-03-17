const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completed:{
    type:Boolean,
    default:false
  },
  createdAt:{
    type:Date,

  }
});

module.exports = mongoose.model("ToDo", toDoSchema);
