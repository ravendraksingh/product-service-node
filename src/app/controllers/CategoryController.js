const Category = require("../models/category");
const { categoryIdSchema } = require("../validators/categorySchema");
const yup = require("yup");
const pathIdSchema = require("../validators/categoryIdSchema");
const Api404Error = require("../errors/Api404Error");

const categories = {
  addCategory: function (req, res) {
    const { body } = req;
    console.log("======= request body =======", body);
    // Category.collection.insertOne(reqbody).then((data) => {
    const _category = new Category(body);
    // Find if document already exists
    Category.exists({ name: body.name }).then((data) => {
      console.log("======== data =======", data);
      if (data) {
        res.status(409).send({
          error: {
            type: "DuplicateError",
            message: "Category already exists",
          },
        });
      } else {
        _category.save({}).then((data) => {
          if (!data) {
            res.status(503).send({
              error: {
                type: "InternalError",
                message: "Could not be added",
              },
            });
          } else {
            res.status(201).send(data);
          }
        });
      }
    });
  },

  search: function (req, res, next) {
    console.log("in search");
    const name = req.query.name;
    const id = req.query.id;
    console.log("name", name);
    let findArguments = {};
    if (name && name.length>2) {
        findArguments = {
            ...findArguments,
            name: { $regex: name, $options: "i" },
          };
    }
    if (id) {
        findArguments = {
            ...findArguments,
            _id: id,
          };
      
    }
    
    console.log("findArguments", findArguments);

    Category.find(findArguments, "-_class").then((data) => {
      //   console.log("data from find: ", data);
      if (data === null || data.length === 0) {
        const err = new Api404Error("Category not found");
        next(err);
      } else {
        res.send(data);
      }
    });
  },

  updateCategory: function (req, res) {
    const reqbody = req.body;
    console.log("======= request body =======", reqbody);
    Category.findByIdAndUpdate({ _id: reqbody._id }, reqbody, {
      new: true,
      upsert: true,
    }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Category not found.",
        });
      } else {
        res.send(data);
      }
    });
  },
};

module.exports = categories;
