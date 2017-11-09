// @flow
const maxScore = 1

// all sizes given in % of canvas width

const heightToWidthRatio = 0.5
const maxCanvasHeight = 400
const maxCanvasWidth = 800


const abyssWidth = 40

const fences = {
  height: 20,
  leftX: 50 - abyssWidth / 2,
  rightX: 50 + abyssWidth / 2
}

const player = {
  radius: 4,
  leftInitialX: 25 - abyssWidth / 4,
  rightInitialX: 75 + abyssWidth / 4,
  jumpingImpulse: 2,
  // how deep the player flattens when hitting the ground? :
  maxDepth: 1.25,
  reboundFromGround: 0.25,
  maxXVel: 0.55,
  xDamping: 0.25,
  gravity: 0.05,
  xAcceleration: 2, // increase of hor speed while L/R key pressed
  yDampingOnRaise: 0.98,
  yAccelerationOnFall: 1.02,
  color: 'tomato'
}


const ballRadius = 3.33
const ball = {
  radius: ballRadius,
  leftInitialPos: [ (25 - abyssWidth / 4), 25 ],
  rightInitialPos: [ (75 + abyssWidth / 4), 25 ],
  neutralPos: [50, 25],
  leftLimit: ballRadius,
  rightLimit: 100 - ballRadius,
  xDamping: 0.993,
  gravity: 0.014,
  // how fast the ball should fly when colliding with player (hypotenuse of x&y vel):
  reboundFromPlayer: 1.85,
  yDampingOnRaise: 0.95,
  yAccelerationOnFall: 1.03,
  minBounceFromFenceTip: 0.16,
  color: 'white'
}

const settings : {
  maxScore: number,
  fences: { height: number, leftX: number, rightX: number },
  player: { radius: number, leftInitialX: number, rightInitialX: number },
  ball: { radius: number },
  abyssWidth: number,
  heightToWidthRatio: number,
  maxCanvasHeight: number,
  maxCanvasWidth: number
} = {
  maxScore, fences, player, ball, abyssWidth,
  heightToWidthRatio, maxCanvasHeight,
  maxCanvasWidth
} 

module.exports = settings
