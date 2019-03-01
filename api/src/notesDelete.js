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

  dynamodb.deleteItem(
    {
      Key: {
        dateCreated: { S: note.dateCreated },
        userId: { S: userId },
      },
      TableName: 'webnotes_notes',
    },
    error => {
      if (error) return callback(error)
      callback(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Vary: 'Origin',
        },
        statusCode: 204,
      })
    },
  )
}
