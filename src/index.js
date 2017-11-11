// @flow

import { connect } from './connection/socket';
import vueApp from './render/secondaryWindows/vueApp';
import { startFrames } from './game'
import { initKeys } from './inputs/'
import preloadImages from './preloadImages'
preloadImages()

require('./requestAnimationFramePolyfill')()

vueApp.init()

connect().then(startFrames)

initKeys()