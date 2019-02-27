const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

const atob = a => Buffer.from(a, 'base64').toString('binary')

exports.handler = (event, context, callback) => {
  let userId

  try {
    userId = JSON.parse(atob(event.headers.Authorization.split('.')[1])).sub
  } catch (e) {
    return callback(e)
  }

  dynamodb.query(
    {
      ExpressionAttributeValues: { ':userId': { S: userId } },
      KeyConditionExpression: 'userId = :userId',
      TableName: 'webnotes_notes',
    },
    (error, data) => {
      if (error) return callback(error)
      callback(null, {
        body: JSON.stringify(
          data.Items.map(({ body, date, userId }) => ({
            body: body.S,
            date: date.S,
            userId: userId.S,
          })),
        ),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json;charset=utf-8',
          Vary: 'Origin',
        },
        statusCode: 200,
      })
    },
  )
}
