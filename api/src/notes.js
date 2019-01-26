exports.handler = (event, context, callback) => {
  const response = {
    body: JSON.stringify([
      'This is the first note.',
      'This is the second note.',
      'This is the third note.\n\nIt has linebreaks in it.',
    ]),
    headers: {
      'Access-Control-Allow-Origin': 'https://webnotes.link',
      'Content-Type': 'application/json;charset=utf-8',
      Vary: 'Origin',
    },
    statusCode: 200,
  }
  callback(null, response)
}
