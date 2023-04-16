const Expense = require("../models/expense");

exports.addExpense = async (req, res, next) => {
  try {
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;

    const data = await Expense.create({
      price: price,
      description: description,
      category: category,
    });
    res.json({ newItemDetail: data });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    const data = await Expense.findAll();
    res.status(200).json({ allExpenses: data });
    console.log(data);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const data = await Expense.destroy({
    where: {
      id: req.params.expenseId,
    },
  });
  res.status(200).json({ data: data });
};
