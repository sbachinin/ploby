import {
  player,
  canvasSize as canv,
  ball
} from './gameSettings'
const c = document.getElementById('root').getContext('2d');


export default function(state) {
  c.clearRect(0, 0, canv.width, canv.height)
  drawPlayers(state.myself, state.enemy)
  drawBall(state.ball.position)
  // drawFenceTip()
  c.closePath()
}


// function drawFenceTip() {
//   c.beginPath()
//   c.arc(
//     fences.leftX,
//     canv.height - fences.height,
//     fences.width / 2, 0, 2 * Math.PI)
//   c.fillStyle = '#a50000'
//   c.fill()

//   c.beginPath()
//   c.arc(
//     fences.rightX,
//     canv.height - fences.height,
//     fences.width / 2, 0, 2 * Math.PI)
//   c.fillStyle = '#a50000'
//   c.fill()
// }

function drawBall(ballPosition) {
  c.beginPath()
  c.arc(
    ballPosition[0],
    canv.height - ballPosition[1],
    ball.radius, 0, 2 * Math.PI)
  c.fillStyle = 'peachpuff'
  c.stroke()
  c.fill()
}

function drawPlayers(myself, enemy) {
  if (myself && myself.position) {
    c.beginPath()
    c.arc(
      myself.position[0],
      canv.height - myself.position[1],
      player.radius, 0, 2 * Math.PI)
    c.fillStyle = 'black'
    c.fill()
  }

  if (enemy && enemy.position) {
    c.beginPath()
    c.arc(
      enemy.position[0],
      canv.height - enemy.position[1],
      player.radius, 0, 2 * Math.PI)
    c.fillStyle = '#ccc'
    c.fill() 
  }
}

