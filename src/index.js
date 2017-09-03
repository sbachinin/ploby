// import './index.css';
import io from 'socket.io-client';
import draw from './draw'; 
import translateKey from './translateKey';

const socketUrl = (
  // create-r-a sets NODE_ENV to production if run build/deploy
	process.env.NODE_ENV === 'production' ?
	'ploby-server.herokuapp.com' :
	'localhost:5000'
);

var socket = io(socketUrl);
socket.on('app state changed', draw);

document.addEventListener('keydown', e => {
  const key = translateKey(e.which)
  if (key) {
    socket.emit('player arrow event', {
      type: 'keydown',
      key
    })    
  }
})
document.addEventListener('keyup', e => {
  const key = translateKey(e.which)
  if (key) {
    socket.emit('player arrow event', {
      type: 'keyup',
      key: translateKey(e.which)
    })
  }
})

// document.on
// socket.emit('input', )