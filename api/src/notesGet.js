const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.handler = ({ userId }, context, callback) => {
  dynamodb.query(
    {
      ExpressionAttributeValues: { ':userId': { S: userId } },
      KeyConditionExpression: 'userId = :userId',
      TableName: 'webnotes_notes',
    },
    (error, data) => {
      if (error) return callback(error)
      callback(
        null,
        data.Items.map(({ body, dateCreated, dateUpdated, userId }) => ({
          body: body.S,
          dateCreated: dateCreated.S,
          dateUpdated: dateUpdated.S,
          userId: userId.S,
        })).sort((a, b) => {
          if (a.dateUpdated < b.dateUpdated) return 1
          if (a.dateUpdated > b.dateUpdated) return -1
          return 0
        }),
      )
    },
  )
}
