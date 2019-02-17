const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.handler = (event, context, callback) =>
  dynamodb.scan({ TableName: 'webnotes_notes' }, (err, data) => {
    if (err) return callback(err)
    callback(null, {
      body: JSON.stringify(
        data.Items.map(({ body, id }) => ({ body: body.S, id: id.S })),
      ),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8',
        Vary: 'Origin',
      },
      statusCode: 200,
    })
  })
