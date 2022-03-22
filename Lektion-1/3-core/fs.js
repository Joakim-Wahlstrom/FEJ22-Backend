const fs = require('fs')

// LÄSA FILER
// fs.readFile('./mapp/text.txt', 'utf8', (err, data) => {
//   if(err) {
//     console.log(err)
//     return
//   }

//   // console.log(data.toString())
//   console.log(data)

// })
// console.log('det här ligger efter')



// SKRIVA FILER
// fs.writeFile('./mapp/text.txt', 'Ny text.', () => {
//   console.log('ändrade på texten')
// })

// fs.writeFile('./mapp/text3.txt', 'En ny fil.', () => {
//   console.log('ändrade på texten')
// })

// fs.appendFile('./mapp/text.txt', '\nDet här är text som vi har lagt till.', () => {
//   console.log('la till text')
// })


// DÖPA OM EN FIL
// fs.rename('./mapp/text3.txt', './mapp/text2.txt', err => {
//   if(err) {
//     console.log(err)
//     return
//   }

//   console.log('bytte namn på filen')
// })




// MAPPAR

// if(!fs.existsSync('./nyMapp')) {
//   fs.mkdir('./nyMapp', err => {
//     if(err) {
//       // if(err.code === 'EEXIST') {
//       //   console.log('mappen finns redan')
//       // }
//       console.log(err)
  
//     }
//     else
//       console.log('mapp skapad')
//   })
// } else {
//   fs.rmdir('./nyMapp', err => {
//     if(err)
//       console.log(err)
//     else
//       console.log('mappen finns.. Tar bort den')
//   })
// }



// TA BORT FILER

if(fs.existsSync('./mapp/text2.txt')) {

  fs.unlink('./mapp/text2.txt', err => {
    if(err)
      console.log(err)
    else
      console.log('tar bot filen')
  })

}


const path = require('path')

// fs.appendFile(path.join(__dirname, '/mapp', 'text.txt'), '\nNu lägger vi till text här igen.', () => {
//   console.log('la till text igen')
// })




// STREAMA

const readStream = fs.createReadStream('./mapp/stor.txt', {encoding: 'utf8'})
const writeStream = fs.createWriteStream('./mapp/stor2.txt')

// readStream.on('data', buffer => {
//   // console.log('-------------------- Ny data -----------------------------');
//   // console.log(buffer)

//   writeStream.write('\n ---------------------------------------- Ny Data ----------------------------------------- \n')
//   writeStream.write(buffer)
// })


readStream.pipe(writeStream)