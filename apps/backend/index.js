const http = require('http')

const server = http.createServer(async (req, res) => {
  res.write(JSON.stringify({ message: 'Hello from the server side' }))
  res.end()
})

server.listen(4000)

console.log('node js!')
