let width, height
if (window.innerWidth / window.innerHeight > 2) {
  height = window.innerHeight > 440 ? 400 : window.innerHeight / 10 * 9
  width = height * 2
} else {
  width = window.innerWidth > 880 ? 800 : window.innerWidth / 10 * 9
  height = width / 2
}

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
    xDamping: 0.993,
    gravity: canvasSize.height / 3500,
    // how fast the ball should fly when colliding with player (hypotenuse of x&y vel):
    reboundFromPlayer: canvasSize.width / 54,
    yDampingOnRaise: 0.95,
    yAccelerationOnFall: 1.03,
    minBounceFromFenceTip: canvasSize.height / 300
  },


  player: {
    radius: canvasSize.width / 25,
    leftInitialX: (canvasSize.width - abyssWidth) / 4,
    rightInitialX: canvasSize.width - (canvasSize.width - abyssWidth) / 4,
    jumpingImpulse: canvasSize.height / 25,
    // how deep the player flattens when hitting the ground? :
    maxDepth: canvasSize.height / 40,
    reboundFromGround: canvasSize.height / 200,
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
