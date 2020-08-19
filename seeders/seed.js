const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
});

const transactionSeed = [
  {
    name: "Loan",
    value: 1200,
    date: new Date(Date.now()),
  },
  {
    name: "Advanced Payment",
    value: 600,
    date: new Date(Date.now()),
  },
  {
    name: "Personal Check",
    value: 250,
    date: new Date(Date.now()),
  },
];

db.Transaction.deleteMany({})
  .then(() => db.Transaction.collection.insertMany(transactionSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted! ");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
