const EventEmmiter = require('events')

class Emitter extends EventEmmiter {
  greet(name) {
    this.emit('greet', name)
  }
}


const myEmitter = new Emitter()


// myEmitter.on('hej', () => console.log('Eventet Hej kördes'))

// myEmitter.emit('hej')


myEmitter.on('greet', data => console.log('Hej ' + data))


myEmitter.greet('Joakim')
myEmitter.greet('Hans')
myEmitter.greet('Tommy')
myEmitter.greet('Nisse')
myEmitter.greet('Jeanette')