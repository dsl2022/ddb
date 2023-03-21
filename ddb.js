const AWS = require('aws-sdk');

AWS.config.update({
  region: 'your-region',
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'your-table';
const array = ['item1', 'item2', 'item3', ...]; // array of items to check

const checkItemExists = async (item) => {
  const params = {
    TableName: table,
    Key: {
      'your-key': item
    }
  };

  try {
    const data = await docClient.get(params).promise();
    return Boolean(data.Item);
  } catch (err) {
    console.log(`Error checking item ${item}:`, err);
    return false;
  }
};

const checkAllItems = async () => {
  for (const item of array) {
    const exists = await checkItemExists(item);
    console.log(`Item ${item} exists: ${exists}`);
  }
};

checkAllItems();
