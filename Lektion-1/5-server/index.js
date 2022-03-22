const http = require('http');
const fs = require('fs');
const path = require('path')

const server = http.createServer((req, res) => {

  if(req.url === '/favicon.ico') {
    res.end()
    return 
  } 

  // res.setHeader('Content-type', 'text/html')
  

  // let fileName;

  // switch(req.url) {

  //   case '/':
  //     fileName = 'index.html';
  //     res.statusCode = 200;
  //     break;
  //   case '/about':
  //     fileName = 'about.html';
  //     res.statusCode = 200;
  //     break;
  //   case '/about-us':
  //     res.statusCode = 301;
  //     res.setHeader('Location', '/about')
  //     res.end()
  //     break;
  //   case '/faq':
  //     fileName = 'faq.html';
  //     res.statusCode = 200;
  //     break;
  //   default:
  //     fileName = '404.html'
  //     res.statusCode = 404;
  //     break;
  // }


  // let filePath = path.join(__dirname, 'views', fileName)

  // fs.readFile(filePath, (err, data) => {
  //   if(err) {
  //     console.log(err)
  //     res.end('gick inte')
  //   }

  //   res.end(data)
  // })


  let filePath = path.join(
    __dirname,
    'views',
    req.url === '/' ? 'index.html' : req.url + '.html'
  )

  fs.readFile(filePath, (err, data) => {

    if(err) {
      if(err.code === 'ENOENT') {
        fs.readFile('./views/404.html', (err, errData) => {
          if(err) {
            console.log(err)
            res.end()
            
          } else {
            res.statusCode = 404;
            res.end(errData)
          }
        })
      } else {
        console.log(err)
        res.end()
        return
      }
    } else {
      res.end(data)

    }

  })


})


const PORT = process.env.PORT || 9999

server.listen(PORT, () => console.log('server running at http://localhost:' + PORT))