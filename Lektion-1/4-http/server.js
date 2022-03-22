const http = require('http');

const server = http.createServer((request, response) => {

  console.log('request made')
  console.log(request.url)

  // response.write('<h1>HELLO</h1>')
  response.end('<h1>HELLO</h1>')
});

server.listen(9999, () => console.log('Server runnig on http://localhost:9999'))