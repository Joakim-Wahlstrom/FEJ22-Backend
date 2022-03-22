const http = require('http');
const fs = require('fs');
const path = require('path')

const server = http.createServer((req, res) => {

  if(req.url === '/favicon.ico') {
    res.end()
    return 
  } 

  res.setHeader('Content-type', 'text/html')
  

  let fileName;

  switch(req.url) {

    case '/':
      fileName = 'index.html';
      break;
    case '/about':
      fileName = 'about.html';
      break;
    case '/faq':
      fileName = 'faq.html';
      break;
    default:
      fileName = '404.html'
      break;
  }


  let filePath = path.join(__dirname, 'views', fileName)

  fs.readFile(filePath, (err, data) => {
    if(err) {
      console.log(err)
      res.end('gick inte')
    }

    res.end(data)
  })




})


const PORT = process.env.PORT || 9999

server.listen(PORT, () => console.log('server running at http://localhost:' + PORT))