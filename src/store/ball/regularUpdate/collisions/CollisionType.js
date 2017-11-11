// @flow

export type Collision = {
  collisionSource: 'player' | 'fence' | 'wall' | 'ground',
  velAfterCollision: Array<number>
}