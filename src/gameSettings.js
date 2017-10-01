const width = window.innerWidth > 880 ? 800 : window.innerWidth / 10 * 9
const height = width / 2

const canvasSize = {
  width,
  height
}

const abyssWidth = canvasSize.width / 3 * 1.2
const ballRadius = canvasSize.width / 30

module.exports = {

  canvasSize,

  abyssWidth,

  ball: {
    radius: ballRadius,
    leftInitialPos: [
      (canvasSize.width - abyssWidth) / 4,
      (canvasSize.height / 2)
    ],
    rightInitialPos: [
      canvasSize.width - (canvasSize.width - abyssWidth) / 4,
      (canvasSize.height / 2)
    ],
    leftLimit: ballRadius,
    rightLimit: canvasSize.width - ballRadius,
    xDamping: 0.992,
    gravity: canvasSize.height / 3000,
    reboundFromPlayer: canvasSize.width / 50, // sum vel (hypotenuse of x&y vel)
    reboundFromFenceTip: canvasSize.width / 300, // sum vel (hypotenuse of x&y vel)
    reboundFromFencePillar: canvasSize.width / 300,
    yDampingOnRaise: 0.95,
    yAccelerationOnFall: 1.03,
  },


  player: {
    radius: canvasSize.width / 25,
    leftInitialX: (canvasSize.width - abyssWidth) / 4,
    rightInitialX: canvasSize.width - (canvasSize.width - abyssWidth) / 4,
    jumpingImpulse: canvasSize.height / 25,
    flatteningDepth: canvasSize.height / 40,
    maxXVel: canvasSize.width / 180,
    xDamping: canvasSize.width / 400,
    gravity: canvasSize.height / 1000,
    xAcceleration: canvasSize.width / 50, // increase of hor speed while L/R key pressed
    yDampingOnRaise: 0.98,
    yAccelerationOnFall: 1.02,
  },

  fences: {
    width: Math.ceil(canvasSize.width / 150),
    height: canvasSize.height / 2.5,
    leftX: (canvasSize.width - abyssWidth) / 2,
    rightX: canvasSize.width - (canvasSize.width - abyssWidth) / 2
  },

// flight properties - shared for player & ball?

}
