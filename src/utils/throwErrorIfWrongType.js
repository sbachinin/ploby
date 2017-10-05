export default (fn, result) =>  {
  if (
    !!result &&
    (typeof result !== 'object' || Array.isArray(result))
  )  {
    throw new TypeError(
      `Piped function should return an object OR any falsy value.
      ${fn.name} returned ${JSON.stringify(result)}`)
  }
};
