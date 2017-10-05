import clone from 'lodash.clonedeep';

export default (items, reducer, initialData) =>  {
  let itemsCount
  let state
  let shouldContinue =  true
  if (initialData) {
    itemsCount = 0
    state = clone(initialData)
  } else {
    itemsCount = 1
    state = clone(items[0])
  }
  while (items[itemsCount]) {
    const returned = reducer(state, items[itemsCount])
    if (returned && returned.RESULT) return returned.RESULT
    itemsCount++
  }
  return result
};
