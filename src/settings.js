// @flow
import objectPath from 'object-path';
import spareSettings from './spareSettings';

export type Settings = {
  fences: { height: number, leftX: number, rightX: number },
  player: { leftInitialX: number, rightInitialX: number, radius: number },
  ball: { radius: number },
  abyssWidth: number,
  heightToWidthRatio: number,
  maxCanvasHeight: number,
  maxCanvasWidth: number
}

let settings : Settings = spareSettings

export const setSettings = (settingsFromServer: Settings) => {
  settings = settingsFromServer
}

export const getAllSettings = () => settings

export const getSetting = (path: string) => objectPath.get(settings, path)

export const getPlayerInitialPos = (side: string): Array<number> =>  {
  const leftX = settings.player.leftInitialX
  const rightX = settings.player.rightInitialX
  return [
    side === 'left' ? leftX : rightX,
    settings.player.radius
  ]
};

export const definePlayerLimits = (side: string): {
  leftLimit: number, rightLimit: number
} => {
  const { player, fences } = settings
  return {
    leftLimit: (
      side === 'left' ?
      player.radius :
      (fences.rightX + player.radius)
    ),
    rightLimit: (
      side === 'left' ?
      (fences.leftX - player.radius) :
      (100 - player.radius)
    )
  }
}