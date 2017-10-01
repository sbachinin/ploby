export function chain() {
  const fns = [].slice.call(arguments)
  let result = true
  
  // execute functions while chain not stopped
  let fnCounter = 0
  while (result && fnCounter < fns.length) {

    result = fns[fnCounter](result)
    fnCounter++
  }
  return result
}
