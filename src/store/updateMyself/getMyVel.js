// @flow

import type { State } from '../../types';

import getMyXVel from './getMyXVel'
import getMyYVel from './getMyYVel'

export default function(state: State): Array<number> {
  return [
    getMyXVel(state),
    getMyYVel(state)
  ]
}
