import {
  onSnapshot,
} from 'firebase/firestore'
import { ref } from '../../firebase/config'
import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io


    
  
    
    io.on('connection', socket => {
      onSnapshot(ref, async function(snapshot) {
        const data = await snapshot.data()
        socket.broadcast.emit('count-update', data.count)
      });
    })
  }

  res.end()
}

export default SocketHandler