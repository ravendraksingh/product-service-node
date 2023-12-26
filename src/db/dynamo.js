const AWS = require("aws-sdk");
const dynamoconfig = require("./dynamoconfig");

const getFromDynamo = function (req, res) {
  AWS.config.update(dynamoconfig.aws_remote_config);
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "products",
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.error(err);
      res.send({
        success: false,
        message: err,
      });
    } else {
      const { Items } = data;
      //console.log(Items);
      res.send(Items);
    }
  });
};

module.exports = {
  getFromDynamo,
};
