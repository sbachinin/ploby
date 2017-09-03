const canv = document.getElementById('root');
const c = canv.getContext('2d');

export default function(state) {
  c.clearRect(0, 0, canv.width, canv.height);
  c.beginPath();
  c.arc(
    state.ball.position[0],
    state.ball.position[1],
    state.ball.radius, 0, 2 * Math.PI);
  c.fillStyle = 'black';
  c.fill();
  
  c.moveTo(canv.width / 2, canv.height / 2);
  c.lineTo(canv.width / 2, canv.height);
  c.stroke();
  c.closePath();
}