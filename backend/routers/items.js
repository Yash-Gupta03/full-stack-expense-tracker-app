const express = require("express");

const itemController = require("../controllers/expenses");

const router = express.Router();

router.use("/add-item", itemController.addExpense);

router.use("/get-items", itemController.getExpense);

router.use("/delete-item/:expenseId", itemController.deleteExpense);

module.exports = router;
