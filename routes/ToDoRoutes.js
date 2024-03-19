const { Router } = require("express");
const {
  getToDos,
  saveToDo,
  updateToDo,
  deleteToDo,
  registerUser,
  loginUser,
} = require("../controller/ToDoController");
const { verifyToken } = require("../auth/verifyToken");

const router = Router();

router.post("register", registerUser);
router.post("login", loginUser);

router.get("get", getToDos);
router.post("save",saveToDo);
router.put("update/:id",updateToDo);
router.delete("delete/:id", deleteToDo);

module.exports = router;
