import lodashReduce from 'lodash.reduce';
import lodashIntersection from 'lodash.intersection'

// Feed data sequentially to multiple functions.
// Each function (adds new props) || (changes some props) of initial object.
// (No risk of replacing entire data - only specific changes)

export default (fns, data) =>  {
  return lodashReduce(
    fns,
    reducer,
    data
  )
};

function reducer(acc, fn) {
  const result = fn(acc)
  if (
    typeof result !== 'undefined' &&
    (typeof result !== 'object' || Array.isArray(result))
  )  {
    throw new TypeError(
`Piped function should return an object OR undefined.
${fn.name} returned ${JSON.stringify(result)}`)
  }
  
  checkForModifiedProps(acc, result)

  return { ...acc, ...result }
}


function checkForModifiedProps(acc, result) {
  if (!result) return
  const oldPropNames = Object.keys(acc)
  const newPropNames = Object.keys(result)
  const modifiedProps = lodashIntersection(oldPropNames, newPropNames)
  if (modifiedProps.length > 0) {
    const oldValues = modifiedProps
    .map(prop => JSON.stringify(acc[prop]))
    .join(',\n ')
    const newValues = modifiedProps
    .map(prop => JSON.stringify(acc[prop]))
    .join(',\n ')
    console.warn(
`You are trying to modify a property that already exists in a piped object: 
${modifiedProps.join(', ')}.
Old values:
${oldValues}
New values:
${newValues}
It is not recommended`
    );
  }
}