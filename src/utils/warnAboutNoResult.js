import throttle from 'lodash.throttle';

export default throttle(_ => {
  console.warn(`your pipe didn't return anything.
One of your piped functions should return {
  pipeResult: <your desired result or smth falsy>
}`)
}, 500);
