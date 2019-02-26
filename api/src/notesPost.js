const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

const atob = a => Buffer.from(a, 'base64').toString('binary')

exports.handler = (event, context, callback) => {
  let note
  let userId

  try {
    note = JSON.parse(event.body)
    userId = JSON.parse(atob(event.headers.Authorization.split('.')[1])).sub
  } catch (e) {
    return callback(e)
  }

  dynamodb.putItem(
    {
      Item: {
        body: { S: note.body },
        date: { S: new Date().toISOString() },
        id: { S: String(Math.floor(Math.random() * 1e8)) },
        userId: { S: userId },
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
