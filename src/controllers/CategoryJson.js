const catJson = require("../../assets/categories.json");

const CategoryJson = {
  getAllCategories: function (req, res) {
    console.log(catJson);
    res.status(200).json(catJson);
  },
  getCategoryById: function (req, res) {
    const id = Number(req.params.id);
    if (id === undefined || id === null || isNaN(id)) {
        res.status(400).send({
            message: "Invalid id: " + req.params.id
        })
    };

    console.log("in CategoryJson:getCategoryById", Number(id));
    // const category = catJson.filter((c) => c.id === id);
    const category = catJson.find((c) => c.id === id);
    console.log("category", category);
    if (category===undefined) {
        res.status(404).json({
            message: "Category not found"
        })
    } else {
        res.status(200).json(category);
    }
  },
};

module.exports = CategoryJson;
