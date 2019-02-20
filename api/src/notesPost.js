const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.handler = (event, context, callback) => {
  let note
  try {
    note = JSON.parse(event.body)
  } catch (e) {
    return callback(e)
  }
  dynamodb.putItem(
    {
      Item: {
        body: { S: note.body },
        id: { S: String(Math.floor(Math.random() * 1e8)) },
      },
      TableName: 'webnotes_notes',
    },
    error => {
      if (error) return callback(error)
      callback(null, {
        body: event.body,
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
