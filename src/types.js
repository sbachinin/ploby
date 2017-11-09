// @flow

export type GeneralState = {
  // things that matter for secondaryWindows
  appPhase: 'playing' | 'game over' | 'choose side' | 'hello window locked' | 'hello window unlocked',
  score: Array<number>,
  mySide: 'left' | 'right' | '',
  sizes: { abyssWidth: number, abyssHeight: number, canvasWidth?: number, canvasHeight?: number }
}

export type CanvasState = {
  ball: Ball,
  myself: Myself,
  enemy?: Enemy,
}

export type KeysState = {
  jumpKeyPressed?: boolean,
  leftKeyPressed?: boolean,
  rightKeyPressed?: boolean,
}

export type Ball = {
  position: Array<number>,
  velocity: Array<number>,
  landed: boolean,
  flightHistory: Array<'abyss' | 'left' | 'right'>
}

export type Myself = {
  position: Array<number>,
  velocity: Array<number>,
  leftLimit: number,
  rightLimit: number
}

export type Enemy = {
  position: Array<number>,
  absent: boolean
}


export type State = {
  generalState: GeneralState,
  canvasState: CanvasState,
  keysState: KeysState
}
