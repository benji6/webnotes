exports.handler = (event, context, callback) => {
  const response = {
    body: JSON.stringify([
      { id: '0', body: 'This is the first note.' },
      { id: '1', body: 'This is the second note.' },
      { id: '2', body: 'This is the third note.\n\nIt has linebreaks in it.' },
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
