const ToDoModel = require("../models/ToDoModel");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const expiresIn = "1d";
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn,
    });

    res.status(200).json({ message: "Login Successful", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log("existing user");
      return res.status(400).json({ message: "Email Already Exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });
      if (newUser) {
        res
          .status(201)
          .json({ message: "User registered successfully", user: newUser });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getToDos = async (req, res) => {
  const userId = req.query.userId;
  const toDos = await ToDoModel.find({ createdBy: userId });
  res.send(toDos);
};

module.exports.saveToDo = async (req, res) => {
  const { toDo, createdAt } = req.body;
  const userId = req.query.userId;

  ToDoModel.create({ toDo, createdBy: userId, createdAt })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateToDo = async (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;
  const { completed } = req.body;
  if (completed) {
    const updatedTodo = await ToDoModel.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
  }
  ToDoModel.findByIdAndUpdate(id, { toDo })
    .then(() => {
      res.send("Updated Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;

  ToDoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Deleted Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
