const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Customer = require("./model/customerSchema");

app.use(express.json());

app.post("/addcustomer", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(200).json(customer);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/getcustomers", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json({ message: customers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getcustomer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update the customer by id

app.put("/updatecustomer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id, req.body);
    if (!customer) {
      return res.status(404).json({ message: err.message });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete the customer from DB

app.delete("/deletecustomer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server has Started! at 8080 in the webpage");
});

app.get("/addbooking", (req, res) => {
  res.send("Add bookings...");
});

mongoose
  .connect(
    "mongodb+srv://developerfs300:56XERLriYWXj8Eau@nodejstutorial.uch22wh.mongodb.net/Resturant"
  )
  .then(() => {
    console.log("Connected to MongoDB>>>>>>>>");
    app.listen(8080, () => {
      console.log("Welcome to the server!");
    });
  })
  .catch((err) => console.log("Error connecting", err));
