const Product = require("../models/product");

const products = {
  //GET get all products
  getAllProducts: function (req, res) {
    Product.find({}, "-_id -_class")
      .then((products) => {
        // console.log(
        //   "************************** response **************************"
        // );
        // console.log("response", res);
        res.send(products);
      })
      .catch((err) => {
        console.log("error", err);
        res.status(500).send({
          message: err.message || "Error occurred while retrieving products.",
        });
      });
  },

  //GET get product by SKU
  getProductBySKU: function (req, res) {
    const sku = req.params.sku;
    console.log("product sku", sku);
    Product.find({ sku: sku }, "-_id -_class").then((data) => {
      if (!data)
        res.status(404).send({
          message: "Product with SKU " + sku + " is not found.",
        });
      else res.send(data);
    });
  },

  searchProductsByName: function (req, res) {
    const name = req.params.name;
    console.log("name", name);
    Product.find({ name: { $regex: name, $options: "i" } }).then((data) => {
      if (!data)
        res.status(404).send({
          message: "Product with name like " + name + " is not found.",
        });
      else res.send(data);
    });
  },

  searchProducts: function (req, res) {
    const searchstr = req.params.searchstr;
    console.log("searchstr", searchstr);
    Product.find({
      $or: [
        { name: { $regex: searchstr, $options: "i" } },
        { description: { $regex: searchstr, $options: "i" } },
      ],
    }).then((data) => {
      if (!data)
        res.status(404).send({
          message: "Product with name like " + name + " is not found.",
        });
      else res.send(data);
    });
  },

  updateProduct: function (req, res) {
    const reqbody = req.body;
    console.log("body ======= ", reqbody);
    Product.findOneAndUpdate({ sku: reqbody.sku }, reqbody, {
      new: true,
      upsert: true,
    })
      // Product.save(reqbody)
      .then((data) => {
        console.log("******************** updated data ******************");
        console.log(data);
        if (!data)
          res.status(404).send({
            message: "Product with sku = " + reqbody.sku + " is not found.",
          });
        else res.send(data);
      });
  },
};

module.exports = products;
