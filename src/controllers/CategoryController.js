const Category = require("../models/category");
const yup = require("yup");
const Api404Error = require("../errors/Api404Error");
const Api500Error = require("../errors/Api500Error");

const categories = {
  addCategory: async function (req, res, next) {
    // console.log(req);
    const body = req.body;
    // Category.collection.insertOne(reqbody).then((data) => {
    const _category = new Category({
      catid: body.id,
      name: body.name,
      description: body.description,
    });

    // Find if document already exists
    try {
      const catExists = await Category.exists({ name: body.name });
      //   console.log(catExists);
      if (!catExists) {
        const savedCategory = await _category.save();
        console.log("savedCategory = ", savedCategory);
        if (savedCategory) {
          res.status(201).json(_category);
        }
      }
    } catch (e) {
      console.log("Error occurred: ", e.message);
      next(e);
    }
  },

  getAllCategories: function (req, res, next) {
    Category.find({}, "-_class").then((data) => {
      console.log("data", data);
      if (data === null || data.length === 0) {
        const err = new Api404Error("Category not found");
        next(err);
      } else {
        // var jsonData = data.map((d) => {
        //   return {
        //     id: d.id,
        //     name: d.name,
        //     description: d.description,
        //   };
        // });
        // res.status(200).send(jsonData);
        res.status(200).send(data);
      }
    });
  },

  getCategoryById: async function (req, res, next) {
    try {
      const id = Number(req.params.id);
      console.log("id ==========>", id);
      const data = await Category.find({ catid: id }, "-_class -_id");
      if (data) {
        //const waitFor = 1000 * (Math.floor(Math.random() * 5) + 2);
        var waitFor = 0;
        if (id === 3 || id === 5) {
          waitFor = 3500;
        }

        // console.log("id=", id, "WaitFor=", waitFor);
        setTimeout(() => {
          //   console.log("set timeout", Date.now());
          res.status(200).json({
            id: data[0].catid,
            name: data[0].name,
            description: data[0].description,
          });
        }, waitFor);
      }
    } catch (e) {
      console.log("Error in getCategoryById: ", e.message);
      next(e);
    }
  },

  search: function (req, res) {
    console.log("in search");
    const name = req.query.name;
    const id = req.query.id;
    console.log("name", name);
    let findArguments = {};
    if (name && name.length > 2) {
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
    // console.log("======= request body =======", reqbody);
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

  deleteCategoryById: function (req, res, next) {
    var id = req.params.id;
    // console.log("id", id);
    if (id === undefined || id === null || isNaN(id)) {
      res.status(400).json({
        message: "Invalid category id",
      });
    } else {
      res.status(204).send();
    }
  },
};

module.exports = categories;
