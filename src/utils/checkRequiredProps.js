// import throttle from 'lodash.throttle';

// export default throttle(checkRequiredProps, 1000, {trailing: true})

export default function checkRequiredProps(fn, state) {
  if (fn.requiredProps) {
    const requiredNames = Object.keys(fn.requiredProps)
    requiredNames.forEach(name => {
      const requiredType = fn.requiredProps[name]
      checkSingleProp(fn, state, name, requiredType)
    })
  }
}


function checkSingleProp(fn, state, requiredName, requiredType) {
  const prop = state[requiredName]
  if (!prop && prop !== 0) {
    console.warn(`You didn't supply ${requiredName} to ${fn.name}`)
    return
  }
  const type = getPropType(prop)
  if (type !== requiredType) {
    console.warn(
      `${requiredName} of invalid type (${type}) is supplied to function ${fn.name}.
      Should be: ${requiredType}`
    )
  }
}


export function getPropType(prop) {
  if (Array.isArray(prop)) return 'array'
  return typeof prop
}
