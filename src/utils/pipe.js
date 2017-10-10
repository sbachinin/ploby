import clone from 'lodash.clonedeep';
import warnIfPropsModified from './warnIfPropsModified';
import checkReturnType from './checkReturnType';
import warnAboutNoResult from './warnAboutNoResult';
import checkRequiredProps from './checkRequiredProps';
// RUN MULTIPLE FUNCTIONS IN SEQUENCE,
// GIVING THEM A STATE OBJECT
// MERGE THE RETURN VALUE OF EACH FUNCTION INTO THIS OBJECT
// WHEN THE RETURNED VALUE CONTAINS PROP 'PIPERESULT',
// STOP ITERATING THROUGH ALL FUNCTIONS AND RETURN THIS PIPERESULT

export default (fns, data) =>  {
  let count = 0
  let state = clone(data)
  while (fns[count]) {
    const returned = invokator(state, fns[count])
    const haveFinalResult = returned && ('pipeResult' in returned)
    if (haveFinalResult) {
      // * final result can exist but be falsy
      return returned.pipeResult
    }
    state = { ...state, ...returned }
    count++
  }
  warnAboutNoResult()
};

function invokator(state, fn) {
  checkRequiredProps(fn, state)
  const result = fn(state)
  checkReturnType(fn, result) // must be object || undefined
  warnIfPropsModified(state, result)
  return result
}


export { log } from './pipeLog'
