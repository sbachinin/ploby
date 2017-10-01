import getMyVel from './getMyVel'

export default function(state) {

  const velocity = getMyVel({...state})

  return {
    velocity,
    position: [
      state.myself.position[0] + velocity[0],
      state.myself.position[1] + velocity[1]
    ]
  }
}





// just OOP thoughts (from Eloquent JS)

  /*
  const Player = (position, velocity) => {
    this.position = position
    this.velocity = velocity
  }

  Player.prototype.move = (velocity) => {
    return new Player(
      [
        this.position[0] + velocity[0],
        this.position[1] + velocity[1]
      ],
      velocity
    )
  }

  const player = new Player(someInitialPos)

  player.move(velocity)

  */