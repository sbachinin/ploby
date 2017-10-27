// @flow

import { enableHelloInputs } from './inputs/helloScreenInputs';
import helloScreen from './helloScreen';

export default () =>  {
  helloScreen.hidePreloader()
  enableHelloInputs()
};
