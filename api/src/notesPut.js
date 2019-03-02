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

  const dateUpdated = new Date().toISOString()

  dynamodb.putItem(
    {
      Item: {
        body: { S: note.body },
        dateCreated: { S: note.dateCreated },
        dateUpdated: { S: dateUpdated },
        userId: { S: userId },
      },
      TableName: 'webnotes_notes',
    },
    error => {
      if (error) return callback(error)
      callback(null, {
        body: JSON.stringify({
          body: note.body,
          dateCreated: note.dateCreated,
          dateUpdated,
          userId,
        }),
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
