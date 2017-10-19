// @flow
import objectPath from 'object-path';

type Settings = {
  fences?: { height: number, leftX: number, rightX: number },
  player?: {},
  ball?: { radius: number },
  abyssWidth?: number,
  heightToWidthRatio?: number,
  maxCanvasHeight?: number,
  maxCanvasWidth?: number
}

let settings : Settings = {}

export const setSettings = (settingsFromServer: Settings) => {
  settings = settingsFromServer
}

export const getAllSettings = () => settings

export const getSetting = (path: string) => objectPath.get(settings, path)
